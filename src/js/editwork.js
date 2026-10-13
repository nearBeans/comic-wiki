import { getWorkById, getAuthorById, getChaptersByWorkId } from "./get.js";
import { tags } from "./data.js";
import { createRating } from "./rating.js";
import { createDataEditor } from "./dataEditor.js";
import { createTableEditor } from "./tableEditor.js";
import { createTextEditor } from "./textEditor.js";
import { addSection, getSections, moveSection, removeSection } from "./detailStore.js";
const detailDragDataType = "application/x-work-section-index";
const param = new URLSearchParams(window.location.search);
const workId = Number(param.get('id'));
const work = getWorkById(workId);
const mainSection = document.querySelector('main');
const pageTitle = document.querySelector('title');
let renderDetails = () => { };
switch (work) {
    case undefined: {
        const httpErrorCont = document.createElement('div');
        httpErrorCont.className = "http404";
        const errorText = document.createElement('h2');
        errorText.textContent = "404 Not Found";
        const linkToTop = document.createElement('a');
        linkToTop.href = "index.html";
        linkToTop.textContent = "←トップに戻る";
        httpErrorCont.appendChild(errorText);
        httpErrorCont.appendChild(linkToTop);
        if (mainSection)
            mainSection.appendChild(httpErrorCont);
        if (pageTitle)
            pageTitle.textContent = "404 Not Found";
        break;
    }
    default: {
        // #region localStorage saving
        const vanillaHist = localStorage.getItem('history');
        if (vanillaHist) {
            const oldHistory = JSON.parse(vanillaHist);
            const newHistory = oldHistory.filter(id => id !== work.id);
            newHistory.unshift(work.id);
            localStorage.setItem('history', JSON.stringify(newHistory));
        }
        else {
            const newHistory = [work.id];
            localStorage.setItem('history', JSON.stringify(newHistory));
        }
        // #endregion
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
        mangaTitle.setAttribute('contenteditable', 'true');
        mangaTitle.textContent = work.title;
        const authorNames = document.createElement('p');
        for (const authorId of work.authorId) {
            const authorLink = document.createElement('a');
            authorLink.href = `author.html?id=${authorId}`;
            authorLink.setAttribute('contenteditable', 'true');
            const foundAuthorId = getAuthorById(authorId);
            if (foundAuthorId)
                authorLink.textContent = foundAuthorId.authorName;
            authorNames.appendChild(authorLink);
        }
        const tagsContainer = document.createElement('ul');
        tagsContainer.className = "tags";
        work.hasTagIds.forEach(tag => {
            const li = document.createElement('li');
            const matchTag = tags.find(q => q.id === tag);
            const link = document.createElement('a');
            link.href = `tag-search.html?tag=${matchTag?.id}`;
            if (matchTag)
                link.textContent = matchTag.name;
            li.appendChild(link);
            tagsContainer.appendChild(li);
        });
        const reviewScore = createRating(work);
        const publishTable = document.createElement('dl');
        const headPublisher = document.createElement('dt');
        headPublisher.textContent = "出版社: ";
        const publisher = document.createElement('dd');
        publisher.setAttribute('contenteditable', 'true');
        publisher.textContent = work.publisher;
        const headMagazines = document.createElement('dt');
        headMagazines.textContent = "掲載誌: ";
        const magazines = document.createElement('dd');
        magazines.setAttribute('contenteditable', 'true');
        magazines.textContent = work.magazines.join(", ");
        const headImprint = document.createElement('dt');
        headImprint.textContent = "レーベル: ";
        const imprint = document.createElement('dd');
        imprint.setAttribute('contenteditable', 'true');
        imprint.textContent = work.imprint;
        publishTable.append(headPublisher, publisher, headMagazines, magazines, headImprint, imprint);
        const descriptionMsg = document.createElement('p');
        descriptionMsg.setAttribute('contenteditable', 'true');
        descriptionMsg.textContent = work.description;
        mangaInfo.append(mangaTitle, authorNames, tagsContainer, reviewScore, publishTable, descriptionMsg);
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
                headingChapterSection.textContent = "紐付けられた作品がありません。";
                chapterSection.appendChild(headingChapterSection);
                break;
            default:
                headingChapterSection.textContent = "エピソード";
                chapterSection.appendChild(headingChapterSection);
                const volumeList = document.createElement('ul');
                volumeList.className = "volume-list";
                workChaptersAndVolumes.volumes.forEach(volume => {
                    const volumeAndChaptersContainer = document.createElement('li');
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
                });
                const unpublishedChapters = workChaptersAndVolumes.chapters.filter(chapter => !workChaptersAndVolumes.volumes.some(volume => volume.chapterIds.includes(chapter.chapterId)));
                const chaptersContainer = document.createElement('li');
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
                });
                chaptersContainer.appendChild(unpublishedChapterList);
                volumeList.appendChild(chaptersContainer);
                chapterSection.appendChild(volumeList);
                // ボタンの描画
                const storyAddingBtns = document.createElement('div');
                storyAddingBtns.className = "adding-btn";
                const storyAddingBtn = document.createElement('button');
                storyAddingBtn.id = "adding-story";
                storyAddingBtn.textContent = "話の追加";
                const volumeAddingBtn = document.createElement('button');
                volumeAddingBtn.id = "adding-volume";
                volumeAddingBtn.textContent = "巻の追加";
                storyAddingBtns.appendChild(storyAddingBtn);
                storyAddingBtns.appendChild(volumeAddingBtn);
                chapterSection.appendChild(storyAddingBtns);
                break;
        }
        containSection.appendChild(chapterSection);
        // #endregion
        // #region details-section
        const detailsSection = document.createElement('section');
        detailsSection.className = "details";
        const detailList = document.createElement('div');
        detailList.className = "detail-list";
        const detailBtnContainer = document.createElement('div');
        detailBtnContainer.className = "detail-btns";
        const detailBtn = document.createElement('button');
        detailBtn.id = "adding-detail";
        detailBtn.textContent = "追加";
        detailBtnContainer.appendChild(detailBtn);
        detailsSection.append(detailList, detailBtnContainer);
        const renderDetailsForWork = () => {
            detailList.replaceChildren();
            getSections(workId).forEach((detailSection, index) => {
                const eachDetailSection = document.createElement('section');
                eachDetailSection.className = "detail";
                const headingRow = document.createElement('div');
                headingRow.className = "detail-heading";
                const dragHandle = document.createElement('button');
                dragHandle.type = "button";
                dragHandle.className = "detail-drag-handle";
                dragHandle.draggable = true;
                dragHandle.textContent = "☰";
                dragHandle.setAttribute('aria-label', `${detailSection.headingName}をドラッグして並べ替え`);
                dragHandle.title = "ドラッグして並べ替え";
                dragHandle.addEventListener('dragstart', event => {
                    event.dataTransfer?.setData(detailDragDataType, String(index));
                    if (event.dataTransfer)
                        event.dataTransfer.effectAllowed = "move";
                    eachDetailSection.classList.add("detail-dragging");
                });
                dragHandle.addEventListener('dragend', () => {
                    detailList.querySelectorAll('.detail-dragging, .detail-drop-before, .detail-drop-after')
                        .forEach(element => element.classList.remove("detail-dragging", "detail-drop-before", "detail-drop-after"));
                });
                eachDetailSection.addEventListener('dragover', event => {
                    if (!event.dataTransfer?.types.includes(detailDragDataType))
                        return;
                    event.preventDefault();
                    if (event.dataTransfer)
                        event.dataTransfer.dropEffect = "move";
                    const bounds = eachDetailSection.getBoundingClientRect();
                    const dropAfter = event.clientY >= bounds.top + bounds.height / 2;
                    eachDetailSection.classList.toggle("detail-drop-before", !dropAfter);
                    eachDetailSection.classList.toggle("detail-drop-after", dropAfter);
                });
                eachDetailSection.addEventListener('dragleave', event => {
                    if (event.relatedTarget instanceof Node && eachDetailSection.contains(event.relatedTarget))
                        return;
                    eachDetailSection.classList.remove("detail-drop-before", "detail-drop-after");
                });
                eachDetailSection.addEventListener('drop', event => {
                    const draggedIndex = event.dataTransfer?.getData(detailDragDataType) ?? "";
                    if (!/^\d+$/.test(draggedIndex))
                        return;
                    event.preventDefault();
                    const fromIndex = Number(draggedIndex);
                    if (Number.isInteger(fromIndex) && fromIndex >= 0 && fromIndex < getSections(workId).length) {
                        const bounds = eachDetailSection.getBoundingClientRect();
                        const dropAfter = event.clientY >= bounds.top + bounds.height / 2;
                        const insertionIndex = index + (dropAfter ? 1 : 0);
                        const toIndex = fromIndex < insertionIndex ? insertionIndex - 1 : insertionIndex;
                        if (fromIndex !== toIndex)
                            moveSection(workId, fromIndex, toIndex);
                        renderDetailsForWork();
                    }
                });
                const headingDetailSection = document.createElement('h3');
                headingDetailSection.textContent = detailSection.headingName;
                const deleteButton = document.createElement('button');
                deleteButton.type = "button";
                deleteButton.className = "detail-remove";
                deleteButton.textContent = "×";
                deleteButton.setAttribute('aria-label', `${detailSection.headingName}を削除`);
                deleteButton.addEventListener('click', () => {
                    removeSection(workId, index);
                    renderDetailsForWork();
                });
                headingRow.append(dragHandle, headingDetailSection, deleteButton);
                eachDetailSection.appendChild(headingRow);
                switch (detailSection.type) {
                    case "string": {
                        const detailText = document.createElement('p');
                        detailText.textContent = detailSection.mainText;
                        eachDetailSection.appendChild(detailText);
                        break;
                    }
                    case "data": {
                        const dataContainer = document.createElement('dl');
                        detailSection.items.forEach(pair => {
                            const dataKey = document.createElement('dt');
                            dataKey.textContent = pair.key;
                            const dataValue = document.createElement('dd');
                            dataValue.textContent = pair.value;
                            dataContainer.append(dataKey, dataValue);
                        });
                        eachDetailSection.appendChild(dataContainer);
                        break;
                    }
                    case "table": {
                        const tableContainer = document.createElement('table');
                        const tableHeadContainer = document.createElement('thead');
                        const tableHeadRow = document.createElement('tr');
                        detailSection.headers.forEach(headItem => {
                            const tableHeadCell = document.createElement('th');
                            tableHeadCell.textContent = headItem;
                            tableHeadRow.appendChild(tableHeadCell);
                        });
                        tableHeadContainer.appendChild(tableHeadRow);
                        const tableBodyContainer = document.createElement('tbody');
                        detailSection.rows.forEach(row => {
                            const tableBodyRow = document.createElement('tr');
                            row.forEach(rowItem => {
                                const tableBodyCell = document.createElement('td');
                                tableBodyCell.textContent = rowItem;
                                tableBodyRow.appendChild(tableBodyCell);
                            });
                            tableBodyContainer.appendChild(tableBodyRow);
                        });
                        tableContainer.append(tableHeadContainer, tableBodyContainer);
                        eachDetailSection.appendChild(tableContainer);
                        break;
                    }
                }
                detailList.appendChild(eachDetailSection);
            });
        };
        renderDetails = renderDetailsForWork;
        renderDetailsForWork();
        containSection.appendChild(detailsSection);
        // #endregion
        // mainに描画
        mainSection?.appendChild(heroSection);
        mainSection?.appendChild(containSection);
        if (pageTitle)
            pageTitle.textContent = `${work.title} - Service Name`;
        break;
    }
}
// #region button-click-event
const connectDialog = (buttonId, dialogId) => {
    const button = document.getElementById(buttonId);
    const dialog = document.getElementById(dialogId);
    if (button && dialog instanceof HTMLDialogElement) {
        button.addEventListener('click', () => dialog.showModal());
    }
};
connectDialog('adding-story', 'story-dialog');
connectDialog('adding-volume', 'volume-dialog');
connectDialog('adding-detail', 'detail-dialog');
const volumeChapterList = document.getElementById('volume-chapter-list');
const volumeChapterData = getChaptersByWorkId(workId);
if (volumeChapterList && volumeChapterData) {
    volumeChapterData.chapters.forEach(chapter => {
        const label = document.createElement('label');
        label.className = 'volume-chapter-option';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'volume-chapter';
        checkbox.value = String(chapter.chapterId);
        const text = document.createElement('span');
        text.textContent = `${chapter.chapterIndex} ${chapter.chapterTitle}`;
        label.append(checkbox, text);
        volumeChapterList.appendChild(label);
    });
}
// #region detail-editors
const detailDialog = document.getElementById('detail-dialog');
const detailTitle = document.getElementById('detail-title');
const dataHost = document.getElementById('detail-data-editor');
const tableHost = document.getElementById('detail-table-editor');
const textWrapper = document.getElementById('detail-text-editor');
const textArea = document.getElementById('detail-text-content');
if (detailDialog instanceof HTMLDialogElement &&
    detailTitle && dataHost && tableHost && textWrapper && textArea) {
    const form = detailDialog.querySelector('form');
    const dataEditor = createDataEditor(dataHost);
    const tableEditor = createTableEditor(tableHost);
    const textEditor = createTextEditor(textArea);
    const selectedType = () => detailDialog.querySelector('input[name="type"]:checked')?.value;
    // 選ばれた形式のエディタだけ表示
    const showEditorFor = (type) => {
        dataHost.hidden = type !== 'data';
        tableHost.hidden = type !== 'table';
        textWrapper.hidden = type !== 'text';
    };
    // 形式とタイトルから、追加するセクションを作る（作れなければnull）
    const buildSection = (type, heading) => {
        if (!heading)
            return null;
        switch (type) {
            case 'data': return dataEditor.toSection(heading);
            case 'table': return tableEditor.toSection(heading);
            case 'text': return textEditor.toSection(heading);
            default: return null;
        }
    };
    detailDialog.querySelectorAll('input[name="type"]').forEach(radio => {
        radio.addEventListener('change', () => showEditorFor(selectedType()));
    });
    // タイトル欄でEnterを押してもダイアログが閉じないように
    detailTitle.addEventListener('keydown', event => {
        if (event.key === 'Enter')
            event.preventDefault();
    });
    // 「追加」を押したときに中身が不十分なら送信を止める
    form?.addEventListener('submit', event => {
        const submitter = event.submitter;
        if (submitter?.value !== 'add')
            return;
        if (!buildSection(selectedType(), detailTitle.value.trim())) {
            event.preventDefault();
            alert('タイトルと内容を入力してください。');
        }
    });
    // 閉じたら（追加でもキャンセルでも）入力を初期化
    detailDialog.addEventListener('close', () => {
        if (detailDialog.returnValue === 'add') {
            const section = buildSection(selectedType(), detailTitle.value.trim());
            if (section) {
                addSection(workId, section);
                renderDetails();
            }
        }
        form?.reset();
        dataEditor.reset();
        tableEditor.reset();
        textEditor.reset();
        showEditorFor(undefined);
    });
}
// #endregion
//# sourceMappingURL=editwork.js.map