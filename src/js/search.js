import { works, authors } from "./data.js";
const param = new URLSearchParams(window.location.search);
const query = String(param.get('q'));
const mainSection = document.querySelector('.main');
const pageTitle = document.querySelector('title');
const searchBox = document.querySelector('input');
if (searchBox)
    searchBox.value = query;
const workResults = works.filter(work => work.title.includes(query));
const authorResults = authors.filter(author => author.authorName.includes(query));
const resultsSection = document.querySelector('.results');
if (workResults === undefined && authorResults === undefined) {
    const notfoundMessage = document.createElement('h3');
    notfoundMessage.textContent = "見つかりませんでした。";
    resultsSection?.appendChild(notfoundMessage);
}
else {
    const cardContainer = document.createElement('div');
    cardContainer.className = "card-grid";
    workResults.forEach(foundWork => {
        const card = document.createElement('a');
        card.className = "manga-card";
        card.href = `work.html?id=${foundWork.id}`;
        const cardImage = document.createElement('img');
        cardImage.src = foundWork.imageUrl;
        cardImage.alt = `${foundWork.title}の書影`;
        const cardTitle = document.createElement('h3');
        cardTitle.textContent = foundWork.title;
        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        cardContainer.appendChild(card);
    });
    authorResults.forEach(foundAuthor => {
        const foundWorkFromAuthor = works.filter(work => work.authorId.some(authorId => authorId === foundAuthor.authorId));
        foundWorkFromAuthor.forEach(work => {
            const card = document.createElement('a');
            card.className = "manga-card";
            card.href = `work.html?id=${work.id}`;
            const cardImage = document.createElement('img');
            cardImage.src = work.imageUrl;
            cardImage.alt = `${work.title}の書影`;
            const cardTitle = document.createElement('h3');
            cardTitle.textContent = work.title;
            card.appendChild(cardImage);
            card.appendChild(cardTitle);
            cardContainer.appendChild(card);
        });
    });
    resultsSection?.appendChild(cardContainer);
}
if (resultsSection)
    mainSection?.appendChild(resultsSection);
//# sourceMappingURL=search.js.map