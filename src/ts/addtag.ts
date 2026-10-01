// import { tags } from "./data";

const tagsList = document.getElementById('tag-list');
const currentTags = document.getElementById('current-tags');
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