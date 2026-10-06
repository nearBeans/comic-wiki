import { tags } from "./data.js";

const param = new URLSearchParams(window.location.search);
const selectedIds = param.getAll("tag").map(Number);
const tagList = document.getElementById('tag-list');
const currentTags = document.getElementById('current-tags');

const selected = new Set<number>();
selectedIds.forEach(id => { selected.add(id) });

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
        } else {
            li.addEventListener('click', () => {
                selected.add(tag.id);
                render();
            });
            tagList?.appendChild(li);
        }
    });
}

render();

const tagSearchBtn = document.getElementById('tagbtn');
tagSearchBtn?.addEventListener('click', () => {
    if (selected.size === 0) {
        if(currentTags) currentTags.textContent = "最低一つは選択してください。";
    } else {
        const params = new URLSearchParams();
        for (const tagId of selected) {
            params.append("tag", String(tagId));
        }
        location.href = `tag-search.html?${params.toString()}`;
    }
})