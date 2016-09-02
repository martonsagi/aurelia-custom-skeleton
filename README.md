# aurelia-custom-skeleton

> A customized Aurelia skeleton application, built with aurelia-cli.

## Pre-installed modules:

* aurelia-i18n
* aurelia-validation
* aurelia-http-client
* jquery
* bootstrap
* font-awesome

## Custom build tasks

* `copy-css`
* `copy-fonts`
* `minify-css`
* `dist`: publishes the application by copying all related files into `dist` folder

## Modified build tasks

* `process-css`
* `build`
* `run`: working directory changed to `dist` folder 

Also, `aurelia.json` has been extended with new sections:

```
    "minifyCss": {
        "output": "css",
        "sources": ["src/assets/css/base.css", "src/assets/css/app.css"],
        "filename": "styles.min.css"
    },
    "copyCss": {
        "output": "src/assets/css",
        "filename": "base.css",
        "sources": [
            "node_modules/font-awesome/css/*.min.css",
            "node_modules/bootstrap/dist/css/*.min.css"
        ]
    },
    "copyFonts": {
        "output": "fonts",
        "sources": [
            "node_modules/font-awesome/fonts/*",
            "node_modules/bootstrap/dist/fonts/*"
        ]
    },
    "dist": {
        "output": "dist",
        "sources": [
            "./css/**/*",
            "./fonts/**/*",
            "./scripts/**/*",
            "./index.html"
        ]
    },
```
