module.exports = {
    ignoreFiles: [
        "*",
        "!_locales",
        "!pages",
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
