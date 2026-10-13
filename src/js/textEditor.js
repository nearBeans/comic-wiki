export const createTextEditor = (textarea) => ({
    reset: () => {
        textarea.value = "";
    },
    toSection: (headingName) => {
        const text = textarea.value.trim();
        return text ? { type: "string", headingName, mainText: text } : null;
    },
});
//# sourceMappingURL=textEditor.js.map