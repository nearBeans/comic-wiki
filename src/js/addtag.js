import { tags } from "./data.js";
const tagList = document.getElementById('tag-list');
const currentTags = document.getElementById('current-tags');
export const selected = new Set();
function render() {
    tagList?.replaceChildren();
    currentTags?.replaceChildren();
    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag.name;
        if (selected.has(tag.id)) {
            li.addEventListener('click', () => {
                selected.delete(tag.id);
                render();
            });
            currentTags?.appendChild(li);
        }
        else {
            li.addEventListener('click', () => {
                selected.add(tag.id);
                render();
            });
            tagList?.appendChild(li);
        }
    });
}
render();
//# sourceMappingURL=addtag.js.map