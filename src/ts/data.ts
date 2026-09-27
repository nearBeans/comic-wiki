export type Work = {
    id: number;
    title: string;
    author: string[];
    imageUrl: string;
    rating: number;
    viewCount: number;
    updatedAt: Date;
    publisher: string;
    magazines: string[];
    imprint: string;
    description: string;
}

export type Ranking = "rating" | "viewCount";

export const works: Work[] = [
    {
        id: 1,
        title: "恋する小惑星",
        author: ["Quro"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.8,
        viewCount: 32,
        updatedAt: new Date("2026-02-12"),
        publisher: "芳文社",
        magazines: ["まんがタイムきららキャラット"],
        imprint: "まんがタイムKRコミックス",
        description: "まんがタイムきららキャラットで2024年8月まで連載されていた4コマ漫画。地学部の女子高生（ジオジョ）が小惑星を探すため、奮闘する物語。"
    },
    {
        id: 2,
        title: "君が死ぬまで恋をしたい",
        author: ["あおのなち"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.2,
        viewCount: 25,
        updatedAt: new Date("2026-09-02"),
        publisher: "一迅社",
        magazines: ["コミック百合姫", "百合姫＠ピクシブ"],
        imprint: "百合姫コミックス",
        description: "2018年から百合姫で連載されている漫画。身寄りのない子どもを学校と呼ばれる場所で戦争用の兵器として育てあげる。14歳のシーナがミミという少女に出会い、変化していく。"
    },
    {
        id: 3,
        title: "日々は過ぎれど飯うまし",
        author: ["あっと", "Quro"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 3.9,
        viewCount: 18,
        updatedAt: new Date("2026-01-25"),
        publisher: "KADOKAWA",
        magazines: ["アライブ++"],
        imprint: "MFコミックス",
        description: "2025年4月から放送されていたアニメのコミカライズ。食べることが好きな河合まこが、再開した同級生らとともにサークルで活動する。実績のために料理していく中で友情が育っていく。"
    },
    {
        id: 4,
        title: "まちカドまぞく",
        author: ["伊藤いづも"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.6,
        viewCount: 59,
        updatedAt: new Date("2025-11-30"),
        publisher: "芳文社",
        magazines: ["まんがタイムきららキャラット"],
        imprint: "まんがタイムKRコミックス",
        description: "2014年から連載が開始された伊藤いづもによる4コマ漫画。闇の一族の末裔であるシャミ子と、光の魔法少女の千代田桃や陽夏木ミカンらとの日常や、隠された真実などが描かれる。"
    },
    {
        id: 5,
        title: "やがて君になる",
        author: ["仲谷鳰"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.5,
        viewCount: 44,
        updatedAt: new Date("2026-06-09"),
        publisher: "KADOKAWA",
        magazines: ["月刊コミック電撃大王"],
        imprint: "電撃コミックスNEXT",
        description: "やがて君になるは、仲谷鳰による百合漫画。誰のことも特別に思えない少女と、自分自身のことが嫌いなために他人からの好意を受け入れられない少女の2人を描く恋愛物語。(wikipedia一部改変)"
    },
    {
        id: 6,
        title: "君のラブを見せてくれ！",
        author: ["リムコロ"],
        imageUrl: "https://placehold.jp/100x142.png",
        rating: 4.1,
        viewCount: 8,
        updatedAt: new Date("2025-10-22"),
        publisher: "KADOKAWA",
        magazines: ["コミックNewtype"],
        imprint: "角川コミックス・エース",
        description: "2025年まで連載されていた、リムコロによる漫画。天才漫画家の高校生、四条恋路は本物の恋を理解することができずスランプに陥っていた。一組の男女をきっかけに、恋の探求が始まる。"
    }
];