module.exports = {
    ignoreFiles: [
        "web-ext-config.js",
        "design",
        "screenshots"
    ],
    run: {
        startUrl: [
            "developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password",
            "about:debugging"
        ]
    },
    build: {
        overwriteDest: true
    }
};