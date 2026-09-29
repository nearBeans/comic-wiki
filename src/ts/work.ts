import { getWorkById, getAuthorById, getChaptersByWorkId } from "./get.js";
import { workSections } from "./data.js";

const param = new URLSearchParams(window.location.search);
const workId = Number(param.get('id'));
const work = getWorkById(workId);
const mainSection = document.querySelector('main');
const pageTitle = document.querySelector('title');

switch (work) {
    case undefined:
        const httpErrorCont = document.createElement('div');
        httpErrorCont.className = "http404";

        const errorText = document.createElement('h2');
        errorText.textContent = "404 Not Found";

        const linkToTop = document.createElement('a');
        linkToTop.href = "index.html";
        linkToTop.textContent = "←トップに戻る"

        httpErrorCont.appendChild(errorText);
        httpErrorCont.appendChild(linkToTop);

        if (mainSection) mainSection.appendChild(httpErrorCont);
        if (pageTitle) pageTitle.textContent = "404 Not Found";
        break;

    default:
        // #region hero-section
        // ヒーローセクションの描画
        const heroSection = document.createElement('section');
        heroSection.className = "manga-hero";

        const heroImage = document.createElement('img');
        heroImage.src = work.clearImageUrl;
        heroImage.alt = `${work.title}の書影`;

        const mangaInfo = document.createElement('div');
        mangaInfo.className = "info";

        const mangaTitle = document.createElement('h2');
        mangaTitle.textContent = work.title;

        const authorNames = document.createElement('p');
        for (const authorId of work.authorId) {
            const authorLink = document.createElement('a');
            authorLink.href = `author.html?id=${authorId}`;
            const foundAuthorId = getAuthorById(authorId);
            if (foundAuthorId) authorLink.textContent = foundAuthorId.authorName;
            authorNames.appendChild(authorLink);
        }

        const reviewScore = document.createElement('data');
        reviewScore.value = work.rating.toString();
        reviewScore.textContent = work.rating.toString();

        const viewCount = document.createElement('data');
        viewCount.value = work.viewCount.toString();
        viewCount.textContent = `(${work.viewCount})`;

        const publishTable = document.createElement('dl');

        const headPublisher = document.createElement('dt');
        headPublisher.textContent = "出版社: "
        const publisher = document.createElement('dd');
        publisher.textContent = work.publisher;

        const headMagazines = document.createElement('dt');
        headMagazines.textContent = "掲載誌: "
        const magazines = document.createElement('dd');
        magazines.textContent = work.magazines.join(", ");

        const headImprint = document.createElement('dt');
        headImprint.textContent = "レーベル: "
        const imprint = document.createElement('dd');
        imprint.textContent = work.imprint;

        publishTable.append(headPublisher, publisher, headMagazines, magazines, headImprint, imprint);

        const descriptionMsg = document.createElement('p');
        descriptionMsg.textContent = work.description;

        mangaInfo.append(mangaTitle, authorNames, reviewScore, viewCount, publishTable, descriptionMsg);
        heroSection.append(heroImage, mangaInfo);
        // #endregion

        // 下部包含セクションの作成
        const containSection = document.createElement('section');
        containSection.className = "contain";

        // #region chapter-section
        // チャプターセクションの描画
        const chapterSection = document.createElement('section');
        chapterSection.className = "episode";
        const headingChapterSection = document.createElement('h3');

        const workChaptersAndVolumes = getChaptersByWorkId(workId);
        switch (workChaptersAndVolumes) {
            case undefined:
                headingChapterSection.textContent = "紐付けられた作品がありません。"
                chapterSection.appendChild(headingChapterSection);
                break;

            default:
                headingChapterSection.textContent = "エピソード";
                chapterSection.appendChild(headingChapterSection);

                const volumeList = document.createElement('ul');
                volumeList.className = "volume-list";

                workChaptersAndVolumes.volumes.forEach(volume => {
                    const volumeAndChaptersContainer = document.createElement('li')
                    // 巻の表示
                    const volumeContainer = document.createElement('div');
                    volumeContainer.className = "volume";
                    const volumeImage = document.createElement('img');
                    volumeImage.src = volume.volumeImageUrl;
                    volumeImage.alt = `${volume.volumeIndex} の書影`;

                    const volumeInfoContainer = document.createElement('div');
                    volumeInfoContainer.className = "volume-info";
                    const headVolumeIndex = document.createElement('h4');
                    headVolumeIndex.textContent = volume.volumeIndex;

                    const year = volume.publishedAt.getFullYear();
                    const month = volume.publishedAt.getMonth() + 1;
                    const date = volume.publishedAt.getDate();
                    const publishedDate = document.createElement('time');
                    publishedDate.textContent = `${year}年${month}月${date}日`;
                    const dateString = [
                        volume.publishedAt.getFullYear(),
                        String(volume.publishedAt.getMonth() + 1).padStart(2, "0"),
                        String(volume.publishedAt.getDate()).padStart(2, "0"),
                    ].join("-");
                    publishedDate.setAttribute('datetime', dateString);

                    volumeInfoContainer.appendChild(headVolumeIndex);
                    volumeInfoContainer.appendChild(publishedDate);

                    volumeContainer.appendChild(volumeImage);
                    volumeContainer.appendChild(volumeInfoContainer);

                    // 収録されている話を描画
                    const chapterList = document.createElement('ul');
                    volume.chapterIds.forEach(hasChapterId => {
                        const foundChapter = workChaptersAndVolumes.chapters.find(chapter => chapter.chapterId === hasChapterId);
                        if (foundChapter) {
                            const chapterListItem = document.createElement('li');

                            const chapterIndex = document.createElement('span');
                            chapterIndex.textContent = foundChapter.chapterIndex;
                            const chapterTitle = document.createElement('span');
                            chapterTitle.textContent = foundChapter.chapterTitle;

                            chapterListItem.appendChild(chapterIndex);
                            chapterListItem.appendChild(chapterTitle);
                            chapterList.appendChild(chapterListItem);
                        }
                    });
                    volumeAndChaptersContainer.appendChild(volumeContainer);
                    volumeAndChaptersContainer.appendChild(chapterList);
                    volumeList.appendChild(volumeAndChaptersContainer);
                })

                const unpublishedChapters = workChaptersAndVolumes.chapters.filter(
                    chapter => !workChaptersAndVolumes.volumes.some(volume => volume.chapterIds.includes(chapter.chapterId))
                )
                const chaptersContainer = document.createElement('li')
                chaptersContainer.className = "leftovers";
                const unpublishedChapterList = document.createElement('ul');
                unpublishedChapters.forEach(chapter => {
                    if (chapter) {
                        const chapterListItem = document.createElement('li');

                        const chapterIndex = document.createElement('span');
                        chapterIndex.textContent = chapter.chapterIndex;
                        const chapterTitle = document.createElement('span');
                        chapterTitle.textContent = chapter.chapterTitle;

                        chapterListItem.appendChild(chapterIndex);
                        chapterListItem.appendChild(chapterTitle);
                        unpublishedChapterList.appendChild(chapterListItem);
                    }
                })
                chaptersContainer.appendChild(unpublishedChapterList);
                volumeList.appendChild(chaptersContainer);

                chapterSection.appendChild(volumeList);
                break;
        }
        containSection.appendChild(chapterSection);
        // #endregion

        // #region details-section
        const detailsSection = document.createElement('section');
        detailsSection.className = "details"

        const foundDetailsWork = workSections.find(workItem => workItem.workId === workId);
        foundDetailsWork?.sections.forEach(detailSection => {
            const eachDetailSection = document.createElement('section');
            const headingDetailSection = document.createElement('h3');
            headingDetailSection.textContent = detailSection.headingName;
            eachDetailSection.appendChild(headingDetailSection);

            switch (detailSection.type) {
                case "string":
                    const detailText = document.createElement('p');
                    detailText.textContent = detailSection.mainText;
                    eachDetailSection.appendChild(detailText);
                    break;
            
                case "data":
                    const dataContainer = document.createElement('dl');
                    detailSection.items.forEach(pair => {
                        const dataKey = document.createElement('dt');
                        dataKey.textContent = pair.key;
                        const dataValue = document.createElement('dd');
                        dataValue.textContent = pair.value;

                        dataContainer.appendChild(dataKey);
                        dataContainer.appendChild(dataValue);
                    })
                    eachDetailSection.appendChild(dataContainer);
                    break;

                case "table":
                    const tableContainer = document.createElement('table');
                    // table header
                    const tableHeadContainer = document.createElement('thead');
                    const tableHeadRow = document.createElement('tr');
                    detailSection.headers.forEach(headItem => {
                        const tableHeadCell = document.createElement('th');
                        tableHeadCell.textContent = headItem;
                        tableHeadRow.appendChild(tableHeadCell);
                    })
                    tableHeadContainer.appendChild(tableHeadRow);

                    // table body
                    const tableBodyContainer = document.createElement('tbody');
                    detailSection.rows.forEach(row => {
                        const tableBodyRow = document.createElement('tr');
                        row.forEach(rowItem => {
                            const tableBodyCell = document.createElement('th');
                            tableBodyCell.textContent = rowItem;
                        })
                        tableBodyRow.appendChild(tableBodyRow);
                    })

                    tableContainer.appendChild(tableHeadContainer);
                    tableContainer.appendChild(tableBodyContainer);

                    eachDetailSection.appendChild(tableContainer);
                    break;
            }
            detailsSection.appendChild(eachDetailSection);
        })
        // #endregion

        // mainに描画
        mainSection?.appendChild(heroSection);
        mainSection?.appendChild(containSection);
        mainSection?.appendChild(detailsSection);

        if (pageTitle) pageTitle.textContent = `${work.title} - Service Name`
        break;
}

