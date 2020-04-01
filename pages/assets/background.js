console.info("Background script executed");

const executeContentScript = (tabId) => {
    chrome.tabs.executeScript(tabId, {
        file: "pages/assets/content.js",
        allFrames: true
    }, () => {
        console.info("Content script executed");
    });
};

chrome.contextMenus.create({
    title: chrome.i18n.getMessage("primaryAction"),
    id: "primaryAction"
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "primaryAction") {
        executeContentScript(tab.id);
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command == "primaryAction") {
        chrome.tabs.query({active: true}, ([tab]) => {
            executeContentScript(tab.id);
        });
    }
});
