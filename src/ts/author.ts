import { works, authors } from "./data.js"

const param = new URLSearchParams(window.location.search);
const authorId = Number(param.get('id'));
const mainSection = document.querySelector('main');
const foundAuthor = authors.find(a => a.authorId === authorId);
const pageTitle = document.querySelector('title');

switch (foundAuthor) {
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
        const headingAuthorName = document.createElement('h2');
        headingAuthorName.textContent = foundAuthor.authorName;

        const worksGrid = document.createElement('div');
        worksGrid.className = "works-grid";
        foundAuthor?.hasWorkId.forEach(workId => {
            const foundWork = works.find(work => work.id === workId);
            switch (foundWork) {
                case undefined:
                    worksGrid.textContent = "表示する作品がありません。"
                    break;

                default:
                    const workCell = document.createElement('a');
                    workCell.className = "work-cell";
                    workCell.href = `work.html?id=${foundWork.id}`

                    const workImage = document.createElement('img');
                    workImage.src = foundWork.imageUrl;
                    workImage.alt = `${foundWork.title}の書影`
                    const workTitle = document.createElement('p');
                    workTitle.textContent = foundWork?.title;

                    workCell.appendChild(workImage);
                    workCell.appendChild(workTitle);
                    worksGrid.appendChild(workCell);
                    break;
            }
        })

        mainSection?.appendChild(headingAuthorName);
        mainSection?.appendChild(worksGrid);
        if (pageTitle) pageTitle.textContent = `${foundAuthor.authorName} - Service Name`;
        break;
}
