import { works, authors, episodes } from "./data.js";
export function getWorkById(id) {
    return works.find(work => work.id === id);
}
export function getAuthorById(id) {
    return authors.find(author => author.authorId === id);
}
export function getChaptersByWorkId(workId) {
    return episodes.find(data => data.workId === workId);
}
//# sourceMappingURL=get.js.map