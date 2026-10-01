import { tags } from "./data.js";

const tagsList = document.getElementById('tag-list');
const currentTags = document.getElementById('current-tags');

const selected = new Set<number>();

if (tagsList) {
    const children = Array.from(tagsList.children);
    children.forEach(c => c.addEventListener('click', () => {
        const tagItem = document.createElement('li');
        tagItem.textContent = c.textContent;
        currentTags?.appendChild(tagItem);
        c.className = "unactive";

        tagItem.addEventListener('click', () => {
            c.classList.remove("unactive");
            tagItem.remove();
        })
    }))
}

tags.forEach(tag => {
    const tagsListItem = document.createElement('li');
    tagsListItem.textContent = tag.name;
    tagsList?.appendChild(tagsListItem);
    tagsListItem.addEventListener('click', () => {
        tagsListItem.classList.add("unactive");
        selected.add(tag.id);

        currentTags?.replaceChildren();
        selected.forEach(id => {
            const foundTag = tags.find(tag => tag.id === id);
            const currentTagsListItem = document.createElement('li');
            if (foundTag) currentTagsListItem.textContent = foundTag.name;
            currentTags?.appendChild(currentTagsListItem);
            currentTagsListItem.addEventListener('click', () => {
                currentTagsListItem.remove();
                tagsListItem.classList.remove("unactive");
                selected.delete(id);
            })
        })
    })
})