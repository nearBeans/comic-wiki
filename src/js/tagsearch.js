import { works } from "./data.js";
const param = new URLSearchParams(window.location.search);
const selectedIds = param.getAll("tag").map(Number);
const pageTitle = document.querySelector('title');
if (pageTitle)
    pageTitle.textContent = `の検索結果 - Service Name`;
const foundWorks = works.filter(item => selectedIds.every(id => item.hasTagIds.includes(id))); // 検索ロジック
// 以下、描画ロジック
const resultsSection = document.querySelector('.results');
if (foundWorks.length === 0) {
    const notfoundMessage = document.createElement('h3');
    notfoundMessage.textContent = "見つかりませんでした。";
    resultsSection?.appendChild(notfoundMessage);
}
else {
    const foundNumber = document.createElement('p');
    foundNumber.textContent = `${foundWorks.length} 件見つかりました。`;
    resultsSection?.appendChild(foundNumber);
    const cardContainer = document.createElement('div');
    cardContainer.className = "card-grid";
    foundWorks.forEach(foundWork => {
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
//# sourceMappingURL=tagsearch.js.map