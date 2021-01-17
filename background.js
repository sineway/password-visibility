browser.runtime.onInstalled.addListener(details => {
    console.debug("runtime.onInstalled");

    if (details.reason == "update" && localStorage.env == "dev") {
        browser.tabs.create({
            url: "localhost:3000/test.html"
        });
    }
});

browser.browserAction.onClicked.addListener(tab => {
    console.debug("browserAction.onClicked");

    browser.tabs.executeScript(tab.id, {
        file: "content.js",
        allFrames: true
    });
});

let manifest = browser.runtime.getManifest();
let shortcut = manifest.commands._execute_browser_action.suggested_key.default;

browser.contextMenus.create({
    id: "primary",
    title: `${ browser.i18n.getMessage("name") } (${ shortcut })`,
    contexts: ["all"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    console.debug("contextMenus.onClicked");

    if (info.menuItemId == "primary") {
        browser.tabs.executeScript(tab.id, {
            file: "content.js",
            allFrames: true
        });
    }
});
