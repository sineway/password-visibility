const scriptProps = {
    file: "javascripts/content.js",
    allFrames: true
};

chrome.contextMenus.create({
    title: chrome.i18n.getMessage("primaryAction"),
    contexts: ["editable"],
    onclick: (info, tab) => chrome.tabs.executeScript(tab.id, scriptProps)
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-password-visibility") {
        chrome.tabs.query({active: true}, ([tab]) => chrome.tabs.executeScript(tab.id, scriptProps));
    }
});