const optionalPermissions = {
    origins: chrome.runtime.getManifest().optional_permissions
};

export class OptionsFormElement extends HTMLFormElement {
    constructor() {
        super();

        this.setAttribute("autocomplete", "off");
        this.addEventListener("input", this.handleInput);
        this.insertAdjacentHTML("beforeEnd", this.createHTML());

        chrome.permissions.contains(optionalPermissions, (checked) => {
            this.accessAll.checked = checked;
        });
        this.waiting = false;
    }
    /**
        @returns {String}
    */
    createHTML() {
        return `
            <p>
                ${chrome.i18n.getMessage("accessLegend")}
            </p>
            <p class="browser-style">
                <input
                    type="checkbox"
                    id="accessAll"
                    name="accessAll">
                <label
                    for="accessAll">
                    ${chrome.i18n.getMessage("accessCheckbox")}
                </label>
            </p>
        `;
    }
    /**
        @param {InputEvent} event
    */
    handleInput(event) {
        if (event.target == this.accessAll) {
            if (this.accessAll.checked) {
                if (!this.waiting) {
                    this.waiting = true;
                    chrome.permissions.request(optionalPermissions, (checked) => {
                        this.accessAll.checked = checked;
                        this.waiting = false;
                    });
                }
            } else {
                chrome.permissions.remove(optionalPermissions);
            }
        }
    }
}

customElements.define("options-form", OptionsFormElement, {
    extends: "form"
});
