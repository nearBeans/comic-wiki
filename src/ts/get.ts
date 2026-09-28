import { works, authors, episodes, type Work, type Author, type Chapter, type Volume, type WorksChapters, type Ranking } from "./data.js"

export function getWorkById(id: number): Work | undefined {
    return works.find(work => work.id === id);
}

export function getAuthorById(id:number): Author | undefined {
    return authors.find(author => author.authorId === id);
}

export function getChaptersByWorkId(workId: number): WorksChapters | undefined {
    return episodes.find(data => data.workId === workId);
}

