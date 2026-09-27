import { works } from "./data.js";

const param = new URLSearchParams(window.location.search);
const workId = Number(param.get('id'));
const work = works.find(work => work.id === workId);
const mainSection = document.querySelector('main');

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

        if (mainSection !== null) mainSection.appendChild(httpErrorCont);
        break;

    default:
        const heroSection = document.createElement('section');
        heroSection.className = "manga-hero";

        const heroImage = document.createElement('img');
        heroImage.src = work.imageUrl;
        heroImage.alt = `${work.title}の書影`;

        const mangaInfo = document.createElement('div');
        mangaInfo.className = "info";

        const mangaTitle = document.createElement('h2');
        mangaTitle.textContent = work.title;

        const authorNames = document.createElement('p');
        for (const author of work.author) {
            const authorLink = document.createElement('a');
            authorLink.href = "";
            authorLink.textContent = author;
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
        mainSection?.appendChild(heroSection);
        break;
}