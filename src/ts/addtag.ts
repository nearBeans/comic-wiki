import { tags } from "./data.js";

const tagsList = document.getElementById('tag-list');
const currentTags = document.getElementById('current-tags');

const selected = new Set<number>();

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