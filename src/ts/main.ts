import { works, authors, type Work, type Ranking } from "./data.js"
import { createRating } from "./rating.js";
// トップページのリセントカードの描画
const container = document.querySelector("#cont-rcnt");
const updateDateWorks = [...works];
updateDateWorks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
updateDateWorks.forEach(work => {
    const card = document.createElement("a");
    card.className = "manga-card";
    card.href = `work.html?id=${work.id}`

    const title = document.createElement("h3");
    title.textContent = work.title;

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = `${work.title}の書影`;

    card.appendChild(image);
    card.appendChild(title);

    container?.appendChild(card);
})

// ランキングのための並び替え・宣言
const ratingWorks = [...works];
ratingWorks.sort((a, b) => b.rating - a.rating);

const viewWorks = [...works];
viewWorks.sort((a, b) => b.viewCount - a.viewCount);

const rateBtn = document.querySelector("#rate-tab");
const viewBtn = document.querySelector("#view-tab");
const rankContainer = document.querySelector("#ranking-container");

let rankingState: Ranking = "rating";
renderRanking(ratingWorks, rankingState);

rateBtn?.addEventListener('click', () => {
    rankingState = "rating";
    renderRanking(ratingWorks, rankingState);
});

viewBtn?.addEventListener('click', () => {
    rankingState = "viewCount";
    renderRanking(viewWorks, rankingState)
});

// ランキングの描画関数
function renderRanking(array: Work[], type: Ranking): void {
    if (rateBtn === null || viewBtn === null) {
        return;
    } else {
        switch (type) {
            case "rating":
                rateBtn.classList.add("rank-active");
                viewBtn.classList.remove("rank-active");
                break;

            case "viewCount":
                viewBtn.classList.add("rank-active");
                rateBtn.classList.remove("rank-active");
                break;
        }
    }

    switch (rankContainer) {
        case null:
            return;
    
        default:
            rankContainer.innerHTML = "";
            break;
    }

    let count = 0;
    for (const work of array) {
        const listItem = document.createElement("li");
        listItem.className = "rank-card";

        const linkCont = document.createElement("a");
        linkCont.href = `work.html?id=${work.id}`;

        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = `${work.title}の書影`;

        const info = document.createElement("div");
        info.className = "manga-info";

        const title = document.createElement("h3");
        title.textContent = work.title;

        const authorNames = document.createElement("p");
        const foundAuthors = authors.filter(author => work.authorId.includes(author.authorId));
        foundAuthors.forEach(array => {
            authorNames.textContent += `${array.authorName}　`;
        })

        const dataContainer = document.createElement("data");
        switch (type) {
            case "rating":
                dataContainer.appendChild(createRating(work));
                break;

            default:
                const data = document.createElement('data');
                data.value = work.viewCount.toString();
                data.textContent = work.viewCount.toString() + "回";
                dataContainer.appendChild(data);
                break;
        }

        info.appendChild(title);
        info.appendChild(authorNames);
        
        info.appendChild(dataContainer);

        linkCont.appendChild(image);
        linkCont.appendChild(info);

        listItem.appendChild(linkCont)
        rankContainer?.appendChild(listItem);
        count++;

        if (!(count < 6)) break;
    }
}
