import os.path as op
from mako.template import Template
from mako.lookup import TemplateLookup
import bottle
from invoke import run, task
from pathlib2 import Path, PurePath


GITHUB_USER = 'feihong'
SITE = '/p5-examples/'
IMPORTS = [
    'from filters import markdown, rst'
]

lookup = TemplateLookup(directories=['templates'], imports=IMPORTS)

app = bottle.Bottle()

if SITE != '/':
    @app.route('/')
    def index():
        return '<a href="%s">Go to site</a>' % SITE


@app.route(SITE)
@app.route(SITE + '<path:path>')
def page(path=''):
    file_ = get_file(path)
    if not file_.endswith('.html'):
        return bottle.static_file(path, root='site')
    return generate(file_)


@task
def serve():
    from livereload import Server
    from livereload.watcher import Watcher
    watcher = Watcher()
    watcher.watch('site', ignore=lambda p: p.endswith('.es6'))
    watcher.watch('templates')
    server = Server(app, watcher)
    server.serve(port=8000)


@task
def build():
    clean()
    for src in Path('site').rglob('*?.*'):
        dest = Path('build') / src.relative_to('site')
        # The .es6 and .map files are useless in production.
        if dest.suffix in ('.es6', '.map'):
            continue
        print dest
        copy_or_generate(src, dest)


@task
def clean():
    if op.isdir('build'):
        run('rm -rf build/*')


@task
def publish():
    build()
    run('ghp-import -n -p build')


NEW_PAGE_HTML_TEMPLATE = u"""\
<%!

title = ${title}
description = ''
grid = True

%>
<%inherit file='${template}' />
"""

NEW_PAGE_JS_TEMPLATE = u"""\
'use strict';

function setup() {
  createCanvas(300, 300)
}

function draw() {
  stroke(0)
  ellipse(50, 50, 80, 80);
}
"""


@task
def new_page():
    from string import Template     # Use Python templates, not Mako templates

    slug = raw_input('Slug for page: ')
    title = raw_input('Title of page: ')
    template = raw_input('Template to inherit from (default is example.html): ')

    new_dir = Path('site') / slug
    if new_dir.exists():
        print '\nDirectory %s already exists, aborting' % new_dir
        return
    new_dir.mkdir()

    html_file = new_dir / 'index.html'
    with html_file.open('w') as fp:
        fp.write(Template(NEW_PAGE_HTML_TEMPLATE).substitute(
            title=repr(title.strip()), template=template.strip() or 'example.html'))

    js_file = new_dir / 'sketch.js'
    with js_file.open('w') as fp:
        class_name = ''.join(s.capitalize() for s in title.split(' '))
        fp.write(Template(NEW_PAGE_JS_TEMPLATE).substitute(
            title=title, class_name=class_name))


def get_file(path):
    result = op.join('site', path)
    if op.isfile(result):
        return result
    if op.isdir(result) and op.isfile(op.join(result, 'index.html')):
        return op.join(result, 'index.html')
    return 'site/404.html'


def get_slug(path):
    if path == 'site/index.html':
        return ''
    else:
        return str(PurePath(path).parent.name)


def generate(path):
    template = Template(open(path).read(), lookup=lookup, imports=IMPORTS)
    return template.render(site=SITE, slug=get_slug(path), user=GITHUB_USER)


def copy_or_generate(src, dest):
    import shutil
    if not dest.exists():
        dest.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix == '.html':
        with dest.open('w') as fp:
            fp.write(generate(str(src)))
    else:
        shutil.copy(str(src), str(dest))
