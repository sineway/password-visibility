class ActionController {
    /*
        @param {Number} tabId
    */
    constructor(tabId) {
        this.tabId = tabId;
        this.reset();
    }
    /*
    */
    reset() {
        this.visible = false;
        this.domPort = null;
    }
    /*
    */
    toggle() {
        this.visible = !this.visible;
        browser.pageAction.setIcon({
            tabId: this.tabId,
            path: (this.visible ? "icons/icons8-wrong-pincode-96.png" : "icons/icons8-good-pincode-96.png")
        });
        this.postMessage({
            visible: this.visible
        });
    }
    /*
        @param {Object} message
    */
    postMessage(message) {
        if (this.domPort) {
            this.domPort.postMessage(message);
            return;
        }
        browser.tabs.executeScript(this.tabId, {
            file: "content-script.js",
            allFrames: true
        }).then(() => {
            this.domPort = browser.tabs.connect(this.tabId);
            this.domPort.onDisconnect.addListener(() => {
                console.info("Content script disconnected.");
                this.reset();
            });
            this.domPort.postMessage(message);
        });
    }
}