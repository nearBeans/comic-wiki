const today = new Date();

type Work = {
    id: number;
    title: string;
    author: string[];
    imageUrl: string;
    rating: number;
    viewCount: number;
    updatedAt: Date;
}

type Ranking = "rating" | "viewCount";

const works: Work[] = [
    {
        id: 1,
        title: "恋する小惑星",
        author: ["Quro"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.8,
        viewCount: 32,
        updatedAt: new Date("2026-02-12")
    },
    {
        id: 2,
        title: "君が死ぬまで恋をしたい",
        author: ["あおのなち"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.2,
        viewCount: 25,
        updatedAt: new Date("2026-09-02")
    },
    {
        id: 3,
        title: "日々は過ぎれど飯うまし",
        author: ["あっと", "Quro"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 3.9,
        viewCount: 18,
        updatedAt: new Date("2026-00-25")
    },
    {
        id: 4,
        title: "まちカドまぞく",
        author: ["伊藤いづも"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.6,
        viewCount: 59,
        updatedAt: new Date("2025-11-30")
    },
    {
        id: 5,
        title: "やがて君になる",
        author: ["仲谷鳰"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.5,
        viewCount: 44,
        updatedAt: new Date("2026-06-09")
    },
    {
        id: 6,
        title: "君のラブを見せてくれ！",
        author: ["リムコロ"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.1,
        viewCount: 8,
        updatedAt: new Date("2025-10-22")
    }
];

const container = document.querySelector("#cont-rcnt");
const updateDateWorks = [...works];
updateDateWorks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
updateDateWorks.forEach(work => {
    const card = document.createElement("div");
    card.className = "manga-card";

    const title = document.createElement("h3");
    title.textContent = work.title;

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = `${work.title}の書影`;

    card.appendChild(image);
    card.appendChild(title);

    container?.appendChild(card);
})


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

// ランキングの描画
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
        linkCont.href = "";

        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = `${work.title}の書影`;

        const info = document.createElement("div");
        info.className = "manga-info";

        const title = document.createElement("h3");
        title.textContent = work.title;

        const authors = document.createElement("p");
        authors.textContent = work.author.join(", ");

        const data = document.createElement("data");
        switch (type) {
            case "rating":
                data.value = work.rating.toString();
                data.textContent = work.rating.toString();
                break;

            default:
                data.value = work.viewCount.toString();
                data.textContent = work.viewCount.toString() + "回";
                break;
        }

        info.appendChild(title);
        info.appendChild(authors);
        info.appendChild(data);

        linkCont.appendChild(image);
        linkCont.appendChild(info);

        listItem.appendChild(linkCont)
        rankContainer?.appendChild(listItem);
        count++;

        if (!(count < 6)) break;
    }
}