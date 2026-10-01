import { works, authors } from "./data.js";
const param = new URLSearchParams(window.location.search);
const query = String(param.get('q') ?? '').trim();
const pageTitle = document.querySelector('title');
if (pageTitle)
    pageTitle.textContent = `${query}の検索結果 - Service Name`;
const searchBox = document.querySelector('input');
if (searchBox)
    searchBox.value = query;
const foundAuthorId = authors
    .filter(author => author.authorName.includes(query))
    .map(author => author.authorId);
const results = works.filter(w => w.title.includes(query)
    || w.authorId.some(id => foundAuthorId.includes(id)));
const resultsSection = document.querySelector('.results');
if (results.length === 0) {
    const notfoundMessage = document.createElement('h3');
    notfoundMessage.textContent = "見つかりませんでした。";
    resultsSection?.appendChild(notfoundMessage);
}
else {
    const foundNumber = document.createElement('p');
    foundNumber.textContent = `${results.length} 件見つかりました。`;
    resultsSection?.appendChild(foundNumber);
    const cardContainer = document.createElement('div');
    cardContainer.className = "card-grid";
    results.forEach(foundWork => {
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
    resultsSection?.appendChild(cardContainer);
}
//# sourceMappingURL=search.js.map