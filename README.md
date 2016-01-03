# Feihong's p5.js Examples

This is a collection of example programs demonstrating the usage of [p5.js](http://p5js.org).

## Installation

Install dependencies:

```
pip install -r requirements.txt
```

## Commands

- `invoke serve` - Launch HTTP server that auto-reloads pages when it detects an edit
- `invoke build` - Generate all files and copy them into the build directory
- `invoke clean` - Delete everything inside the build directory
- `invoke publish` - Changes in the build directory are committed and pushed to the gh-pages branch
- `invoke new_page` - Add a new page to the site directory (also adds new entry to webpack config file)
