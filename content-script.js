console.info("Content script executed.");

/*
    @param {Document|ShadowRoot} rootNode
    @param {Boolean} visible
*/
const updatePasswordVisibility = (rootNode, visible) => {
    rootNode.querySelectorAll(`input[type~="password"]`).forEach((inputView) => {
        inputView.type = (visible ? "password " : "password");
    });
};

/*
    @param {Object} message
*/
const onPortMessage = (message) => {
    console.info("Message received.");
    updatePasswordVisibility(document, message.visible);
    document.querySelectorAll("*").forEach((anyView) => {
        if (anyView.shadowRoot) {
            updatePasswordVisibility(anyView.shadowRoot, message.visible);
        }
    });
};

/*
    @param {Object} port
*/
const onRuntimeConnect = (port) => {
    if (port.sender.id === browser.runtime.id) {
        console.info("Background script connected.");
        port.onMessage.addListener(onPortMessage);
    }
};
browser.runtime.onConnect.addListener(onRuntimeConnect);
