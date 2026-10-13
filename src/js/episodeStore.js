import { episodes } from "./data.js";
const storageKey = (workId) => `work-episodes:${workId}`;
const cloneEpisodes = (work) => ({
    workId: work.workId,
    chapters: work.chapters.map(chapter => ({ ...chapter, releasedAt: new Date(chapter.releasedAt) })),
    volumes: work.volumes.map(volume => ({
        ...volume,
        chapterIds: [...volume.chapterIds],
        publishedAt: new Date(volume.publishedAt),
    })),
});
const isSavedEpisodes = (value) => {
    if (typeof value !== "object" || value === null ||
        !("workId" in value) || typeof value.workId !== "number" ||
        !("chapters" in value) || !Array.isArray(value.chapters) ||
        !("volumes" in value) || !Array.isArray(value.volumes))
        return false;
    const validChapters = value.chapters.every((chapter) => typeof chapter === "object" && chapter !== null &&
        "chapterId" in chapter && typeof chapter.chapterId === "number" &&
        "chapterIndex" in chapter && typeof chapter.chapterIndex === "string" &&
        "chapterTitle" in chapter && typeof chapter.chapterTitle === "string" &&
        "releasedAt" in chapter && typeof chapter.releasedAt === "string");
    const validVolumes = value.volumes.every((volume) => typeof volume === "object" && volume !== null &&
        "volumeId" in volume && typeof volume.volumeId === "number" &&
        "volumeIndex" in volume && typeof volume.volumeIndex === "string" &&
        "volumeImageUrl" in volume && typeof volume.volumeImageUrl === "string" &&
        "chapterIds" in volume && Array.isArray(volume.chapterIds) &&
        volume.chapterIds.every((id) => typeof id === "number") &&
        "publishedAt" in volume && typeof volume.publishedAt === "string");
    return validChapters && validVolumes;
};
export const getEpisodes = (workId) => {
    const original = episodes.find(work => work.workId === workId);
    const storedEpisodes = localStorage.getItem(storageKey(workId));
    if (storedEpisodes === null)
        return original ? cloneEpisodes(original) : undefined;
    try {
        const parsed = JSON.parse(storedEpisodes);
        if (!isSavedEpisodes(parsed) || parsed.workId !== workId) {
            throw new Error(`Invalid saved episodes for work ${workId}.`);
        }
        return {
            workId,
            chapters: parsed.chapters.map(chapter => ({ ...chapter, releasedAt: new Date(chapter.releasedAt) })),
            volumes: parsed.volumes.map(volume => ({
                ...volume,
                chapterIds: [...volume.chapterIds],
                publishedAt: new Date(volume.publishedAt),
            })),
        };
    }
    catch (error) {
        console.error(`Failed to load saved episodes for work ${workId}.`, error);
        return original ? cloneEpisodes(original) : undefined;
    }
};
const saveEpisodes = (workId, work) => {
    localStorage.setItem(storageKey(workId), JSON.stringify(work));
};
export const removeEpisode = (workId, chapterId) => {
    const work = getEpisodes(workId);
    if (!work)
        throw new Error(`No episode data found for work ${workId}.`);
    if (!work.chapters.some(chapter => chapter.chapterId === chapterId)) {
        throw new RangeError(`Invalid episode ID: ${chapterId}.`);
    }
    work.chapters = work.chapters.filter(chapter => chapter.chapterId !== chapterId);
    work.volumes.forEach(volume => {
        volume.chapterIds = volume.chapterIds.filter(id => id !== chapterId);
    });
    saveEpisodes(workId, work);
};
export const moveEpisode = (workId, chapterId, targetChapterId, volumeId, insertAfter) => {
    if (chapterId === targetChapterId)
        return;
    const work = getEpisodes(workId);
    if (!work)
        throw new Error(`No episode data found for work ${workId}.`);
    const episodeIds = volumeId === null
        ? work.chapters
            .filter(chapter => !work.volumes.some(volume => volume.chapterIds.includes(chapter.chapterId)))
            .map(chapter => chapter.chapterId)
        : work.volumes.find(volume => volume.volumeId === volumeId)?.chapterIds;
    if (!episodeIds || !episodeIds.includes(chapterId) || !episodeIds.includes(targetChapterId)) {
        throw new RangeError("Episodes must be reordered within the same volume or uncollected list.");
    }
    const fromIndex = episodeIds.indexOf(chapterId);
    const targetIndex = episodeIds.indexOf(targetChapterId);
    episodeIds.splice(fromIndex, 1);
    const adjustedTargetIndex = fromIndex < targetIndex ? targetIndex - 1 : targetIndex;
    episodeIds.splice(adjustedTargetIndex + (insertAfter ? 1 : 0), 0, chapterId);
    if (volumeId !== null) {
        const volume = work.volumes.find(item => item.volumeId === volumeId);
        if (!volume)
            throw new RangeError(`Invalid volume ID: ${volumeId}.`);
        volume.chapterIds = episodeIds;
    }
    else {
        const orderedUncollected = episodeIds.map(id => work.chapters.find(chapter => chapter.chapterId === id))
            .filter((chapter) => chapter !== undefined);
        let nextUncollectedIndex = 0;
        work.chapters = work.chapters.map(chapter => work.volumes.some(volume => volume.chapterIds.includes(chapter.chapterId))
            ? chapter
            : orderedUncollected[nextUncollectedIndex++] ?? chapter);
    }
    saveEpisodes(workId, work);
};
//# sourceMappingURL=episodeStore.js.map