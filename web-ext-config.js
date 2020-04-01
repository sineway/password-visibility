module.exports = {
    ignoreFiles: [
        "*",
        "images/screenshot-*",
        "!{_locales,images,javascripts}",
        "!manifest.json"
    ],
    run: {
        startUrl: [
            "developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password",
            "about:debugging#/runtime/this-firefox"
        ]
    },
    build: {
        overwriteDest: true
    }
};
