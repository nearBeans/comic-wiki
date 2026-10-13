import { workSections } from "./data.js";
const storageKey = (workId) => `work-sections:${workId}`;
const cloneSection = (section) => {
    switch (section.type) {
        case "string":
            return { ...section };
        case "data":
            return { ...section, items: section.items.map(item => ({ ...item })) };
        case "table":
            return { ...section, headers: [...section.headers], rows: section.rows.map(row => [...row]) };
    }
};
const isStringArray = (value) => Array.isArray(value) && value.every(item => typeof item === "string");
const isSection = (value) => {
    if (typeof value !== "object" || value === null || !("type" in value) || !("headingName" in value))
        return false;
    if (typeof value.headingName !== "string")
        return false;
    switch (value.type) {
        case "string":
            return "mainText" in value && typeof value.mainText === "string";
        case "data":
            return "items" in value && Array.isArray(value.items) &&
                value.items.every(item => typeof item === "object" && item !== null &&
                    "key" in item && typeof item.key === "string" &&
                    "value" in item && typeof item.value === "string");
        case "table":
            return "headers" in value && isStringArray(value.headers) &&
                "rows" in value && Array.isArray(value.rows) && value.rows.every(isStringArray);
        default:
            return false;
    }
};
const saveSections = (workId, sections) => {
    localStorage.setItem(storageKey(workId), JSON.stringify(sections));
};
export const getSections = (workId) => {
    const storedSections = localStorage.getItem(storageKey(workId));
    if (storedSections === null) {
        const initialSections = workSections.find(work => work.workId === workId)?.sections ?? [];
        return initialSections.map(cloneSection);
    }
    const parsed = JSON.parse(storedSections);
    if (!Array.isArray(parsed) || !parsed.every(isSection)) {
        throw new Error(`Invalid saved detail sections for work ${workId}.`);
    }
    return parsed.map(cloneSection);
};
export const addSection = (workId, section) => {
    const sections = getSections(workId);
    sections.push(cloneSection(section));
    saveSections(workId, sections);
};
export const removeSection = (workId, index) => {
    const sections = getSections(workId);
    if (!Number.isInteger(index) || index < 0 || index >= sections.length) {
        throw new RangeError(`Invalid detail section index: ${index}.`);
    }
    sections.splice(index, 1);
    saveSections(workId, sections);
};
export const moveSection = (workId, fromIndex, toIndex) => {
    const sections = getSections(workId);
    if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex) ||
        fromIndex < 0 || fromIndex >= sections.length ||
        toIndex < 0 || toIndex >= sections.length) {
        throw new RangeError(`Invalid detail section move: ${fromIndex} to ${toIndex}.`);
    }
    const [section] = sections.splice(fromIndex, 1);
    if (section)
        sections.splice(toIndex, 0, section);
    saveSections(workId, sections);
};
//# sourceMappingURL=detailStore.js.map