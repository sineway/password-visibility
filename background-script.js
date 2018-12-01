console.clear();
console.info("Background script executed.");

/*
    @type {Map}
*/
const actionControllers = new Map();

/*
    @param {Number} tabId
    @param {Object} changeInfo
    @param {Object} tab
*/
const onTabUpdated = (tabId, changeInfo, tab) => {
    console.info(`Tab ${tabId} updated.`);
    if (tab.status === "complete") {
        browser.pageAction.isShown({tabId}).then((isShown) => {
            if (!isShown) {
                browser.pageAction.show(tabId);
            }
        });
        if (!actionControllers.has(tabId)) {
            actionControllers.set(tabId, new ActionController(tabId));
            console.info(`Action controller created.`);
        }
    }
};
browser.tabs.onUpdated.addListener(onTabUpdated);

/*
    @param {Number} tabId
*/
const onTabRemoved = (tabId) => {
    console.info(`Tab ${tabId} removed.`);
    if (actionControllers.delete(tabId)) {
        console.info(`Action controller removed.`);
    }
};
browser.tabs.onRemoved.addListener(onTabRemoved);

/*
    @param {Object} tab
*/
const onPageActionClicked = (tab) => {
    const {origin} = new URL(tab.url);
    if (!/(mozilla\.org|firefox\.com)$/.test(origin)) {
        actionControllers.get(tab.id).toggle();
    }
};
browser.pageAction.onClicked.addListener(onPageActionClicked);

