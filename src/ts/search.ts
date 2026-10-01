import { works } from "./data.js";

const param = new URLSearchParams(window.location.search);
const query = String(param.get('q'));
const mainSection = document.querySelector('.main');
const pageTitle = document.querySelector('title');

const results = works.filter(work => work.title.includes(query));
const resultsSection = document.querySelector('.results');

switch (results) {
    case undefined: {
        const notfoundMessage = document.createElement('h3');
        notfoundMessage.textContent = "作品が見つかりませんでした。"
        resultsSection?.appendChild(notfoundMessage);
        break;
    }

    default: {
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
        })
        resultsSection?.appendChild(cardContainer);
        break;
    }
}

if (resultsSection) mainSection?.appendChild(resultsSection);
