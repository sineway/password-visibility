[
    document,
    ...[...document.querySelectorAll("*")].filter((item) => item.shadowRoot).map((item) => item.shadowRoot)
].forEach((root) => {
    root.querySelectorAll(`input[type~="password"]`).forEach((input) => {
        input.type = (input.type === "password") ? `${input.type} ` : "password";
    });
});
