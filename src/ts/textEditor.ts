import type { StringSection } from "./data.js";

export type TextEditor = {
    reset: () => void;
    toSection: (headingName: string) => StringSection | null;
};

export const createTextEditor = (textarea: HTMLTextAreaElement): TextEditor => ({
    reset: () => {
        textarea.value = "";
    },
    toSection: (headingName: string): StringSection | null => {
        const text = textarea.value.trim();
        return text ? { type: "string", headingName, mainText: text } : null;
    },
});