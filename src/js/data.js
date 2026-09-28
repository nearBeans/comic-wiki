export const works = [
    {
        id: 1,
        title: "恋する小惑星",
        authorId: [5],
        imageUrl: "https://placehold.jp/100x142.png",
        clearImageUrl: "https://placehold.jp/500x710.png",
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
        authorId: [1],
        imageUrl: "https://placehold.jp/100x142.png",
        clearImageUrl: "https://placehold.jp/500x710.png",
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
        authorId: [2, 5],
        imageUrl: "https://placehold.jp/100x142.png",
        clearImageUrl: "https://placehold.jp/500x710.png",
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
        authorId: [6],
        imageUrl: "https://placehold.jp/100x142.png",
        clearImageUrl: "https://placehold.jp/500x710.png",
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
        authorId: [4],
        imageUrl: "https://placehold.jp/100x142.png",
        clearImageUrl: "https://placehold.jp/500x710.png",
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
        authorId: [3],
        imageUrl: "https://placehold.jp/100x142.png",
        clearImageUrl: "https://placehold.jp/500x710.png",
        rating: 4.1,
        viewCount: 8,
        updatedAt: new Date("2025-10-22"),
        publisher: "KADOKAWA",
        magazines: ["コミックNewtype"],
        imprint: "角川コミックス・エース",
        description: "2025年まで連載されていた、リムコロによる漫画。天才漫画家の高校生、四条恋路は本物の恋を理解することができずスランプに陥っていた。一組の男女をきっかけに、恋の探求が始まる。"
    }
];
export const authors = [
    {
        authorId: 1,
        authorName: "あおのなち",
        hasWorkId: [2]
    },
    {
        authorId: 2,
        authorName: "あっと",
        hasWorkId: [3]
    },
    {
        authorId: 3,
        authorName: "リムコロ",
        hasWorkId: [6]
    },
    {
        authorId: 4,
        authorName: "仲谷鳰",
        hasWorkId: [5]
    },
    {
        authorId: 5,
        authorName: "Quro",
        hasWorkId: [1, 3]
    },
    {
        authorId: 6,
        authorName: "伊藤いづも",
        hasWorkId: [4]
    }
];
export const episodes = [
    {
        workId: 1,
        chapters: [
            {
                chapterId: 1,
                chapterIndex: "第1話",
                chapterTitle: "はじめての星",
                releasedAt: new Date("2024-07-15")
            },
            {
                chapterId: 2,
                chapterIndex: "第2話",
                chapterTitle: "星を探して",
                releasedAt: new Date("2024-08-12")
            },
            {
                chapterId: 3,
                chapterIndex: "第3話",
                chapterTitle: "地学部の日常",
                releasedAt: new Date("2024-09-10")
            },
            {
                chapterId: 4,
                chapterIndex: "第4話",
                chapterTitle: "観測会",
                releasedAt: new Date("2024-10-14")
            },
            {
                chapterId: 5,
                chapterIndex: "第5話",
                chapterTitle: "冬の星空",
                releasedAt: new Date("2024-11-11")
            },
            {
                chapterId: 6,
                chapterIndex: "第6話",
                chapterTitle: "新しい目標",
                releasedAt: new Date("2024-12-09")
            },
            {
                chapterId: 7,
                chapterIndex: "第7話",
                chapterTitle: "春の観測",
                releasedAt: new Date("2025-01-13")
            },
            {
                chapterId: 8,
                chapterIndex: "第8話",
                chapterTitle: "次の星へ",
                releasedAt: new Date("2025-02-10")
            }
        ],
        volumes: [
            {
                volumeId: 1,
                volumeIndex: "1巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [1, 2, 3],
                publishedAt: new Date("2024-11-27")
            },
            {
                volumeId: 2,
                volumeIndex: "2巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [4, 5, 6],
                publishedAt: new Date("2025-04-25")
            }
        ]
    },
    {
        workId: 2,
        chapters: [
            {
                chapterId: 9,
                chapterIndex: "第1話",
                chapterTitle: "出会い",
                releasedAt: new Date("2024-06-18")
            },
            {
                chapterId: 10,
                chapterIndex: "第2話",
                chapterTitle: "学校の日々",
                releasedAt: new Date("2024-08-18")
            },
            {
                chapterId: 11,
                chapterIndex: "第3話",
                chapterTitle: "小さな変化",
                releasedAt: new Date("2024-10-18")
            },
            {
                chapterId: 12,
                chapterIndex: "第4話",
                chapterTitle: "ふたりの時間",
                releasedAt: new Date("2024-12-18")
            },
            {
                chapterId: 13,
                chapterIndex: "第5話",
                chapterTitle: "揺れる気持ち",
                releasedAt: new Date("2025-02-18")
            },
            {
                chapterId: 14,
                chapterIndex: "第6話",
                chapterTitle: "これからのこと",
                releasedAt: new Date("2025-04-18")
            },
            {
                chapterId: 15,
                chapterIndex: "第7話",
                chapterTitle: "約束",
                releasedAt: new Date("2025-06-18")
            },
            {
                chapterId: 16,
                chapterIndex: "第8話",
                chapterTitle: "新しい日々",
                releasedAt: new Date("2025-08-18")
            }
        ],
        volumes: [
            {
                volumeId: 3,
                volumeIndex: "1巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [9, 10, 11],
                publishedAt: new Date("2025-01-18")
            },
            {
                volumeId: 4,
                volumeIndex: "2巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [12, 13, 14],
                publishedAt: new Date("2025-07-18")
            }
        ]
    },
    {
        workId: 3,
        chapters: [
            {
                chapterId: 17,
                chapterIndex: "第1話",
                chapterTitle: "はじめてのサークル",
                releasedAt: new Date("2025-04-10")
            },
            {
                chapterId: 18,
                chapterIndex: "第2話",
                chapterTitle: "みんなでごはん",
                releasedAt: new Date("2025-05-10")
            },
            {
                chapterId: 19,
                chapterIndex: "第3話",
                chapterTitle: "料理をしよう",
                releasedAt: new Date("2025-06-10")
            },
            {
                chapterId: 20,
                chapterIndex: "第4話",
                chapterTitle: "放課後の時間",
                releasedAt: new Date("2025-07-10")
            },
            {
                chapterId: 21,
                chapterIndex: "第5話",
                chapterTitle: "夏休み",
                releasedAt: new Date("2025-08-10")
            },
            {
                chapterId: 22,
                chapterIndex: "第6話",
                chapterTitle: "秋の味覚",
                releasedAt: new Date("2025-09-10")
            }
        ],
        volumes: [
            {
                volumeId: 5,
                volumeIndex: "1巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [17, 18, 19],
                publishedAt: new Date("2025-10-23")
            }
        ]
    },
    {
        workId: 4,
        chapters: [
            {
                chapterId: 23,
                chapterIndex: "第1話",
                chapterTitle: "夢見る少女",
                releasedAt: new Date("2024-04-28")
            },
            {
                chapterId: 24,
                chapterIndex: "第2話",
                chapterTitle: "魔法少女との出会い",
                releasedAt: new Date("2024-05-28")
            },
            {
                chapterId: 25,
                chapterIndex: "第3話",
                chapterTitle: "商店街の一日",
                releasedAt: new Date("2024-06-28")
            },
            {
                chapterId: 26,
                chapterIndex: "第4話",
                chapterTitle: "新しい仲間",
                releasedAt: new Date("2024-07-28")
            },
            {
                chapterId: 27,
                chapterIndex: "第5話",
                chapterTitle: "ごせんぞ",
                releasedAt: new Date("2024-08-28")
            },
            {
                chapterId: 28,
                chapterIndex: "第6話",
                chapterTitle: "まちの秘密",
                releasedAt: new Date("2024-09-28")
            },
            {
                chapterId: 29,
                chapterIndex: "第7話",
                chapterTitle: "いつもの日常",
                releasedAt: new Date("2024-10-28")
            },
            {
                chapterId: 30,
                chapterIndex: "第8話",
                chapterTitle: "新たな試練",
                releasedAt: new Date("2024-11-28")
            },
            {
                chapterId: 31,
                chapterIndex: "第9話",
                chapterTitle: "新しい朝",
                releasedAt: new Date("2024-12-28")
            }
        ],
        volumes: [
            {
                volumeId: 6,
                volumeIndex: "1巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [23, 24, 25, 26],
                publishedAt: new Date("2025-01-27")
            },
            {
                volumeId: 7,
                volumeIndex: "2巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [27, 28, 29],
                publishedAt: new Date("2025-07-27")
            }
        ]
    },
    {
        workId: 5,
        chapters: [
            {
                chapterId: 32,
                chapterIndex: "第1話",
                chapterTitle: "特別ということ",
                releasedAt: new Date("2024-04-27")
            },
            {
                chapterId: 33,
                chapterIndex: "第2話",
                chapterTitle: "生徒会",
                releasedAt: new Date("2024-05-27")
            },
            {
                chapterId: 34,
                chapterIndex: "第3話",
                chapterTitle: "先輩と後輩",
                releasedAt: new Date("2024-06-27")
            },
            {
                chapterId: 35,
                chapterIndex: "第4話",
                chapterTitle: "放課後",
                releasedAt: new Date("2024-07-27")
            },
            {
                chapterId: 36,
                chapterIndex: "第5話",
                chapterTitle: "夏の日",
                releasedAt: new Date("2024-08-27")
            },
            {
                chapterId: 37,
                chapterIndex: "第6話",
                chapterTitle: "ふたりの距離",
                releasedAt: new Date("2024-09-27")
            },
            {
                chapterId: 38,
                chapterIndex: "第7話",
                chapterTitle: "文化祭",
                releasedAt: new Date("2024-10-27")
            }
        ],
        volumes: [
            {
                volumeId: 8,
                volumeIndex: "1巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [32, 33, 34],
                publishedAt: new Date("2025-01-27")
            },
            {
                volumeId: 9,
                volumeIndex: "2巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [35, 36],
                publishedAt: new Date("2025-07-27")
            }
        ]
    },
    {
        workId: 6,
        chapters: [
            {
                chapterId: 39,
                chapterIndex: "第1話",
                chapterTitle: "恋を探して",
                releasedAt: new Date("2025-04-25")
            },
            {
                chapterId: 40,
                chapterIndex: "第2話",
                chapterTitle: "漫画家の悩み",
                releasedAt: new Date("2025-06-25")
            },
            {
                chapterId: 41,
                chapterIndex: "第3話",
                chapterTitle: "恋とは何か",
                releasedAt: new Date("2025-08-25")
            },
            {
                chapterId: 42,
                chapterIndex: "第4話",
                chapterTitle: "ふたりの出会い",
                releasedAt: new Date("2025-10-25")
            },
            {
                chapterId: 43,
                chapterIndex: "第5話",
                chapterTitle: "新しい発見",
                releasedAt: new Date("2026-02-25")
            },
            {
                chapterId: 44,
                chapterIndex: "第6話",
                chapterTitle: "恋の行方",
                releasedAt: new Date("2026-06-25")
            }
        ],
        volumes: [
            {
                volumeId: 10,
                volumeIndex: "1巻",
                volumeImageUrl: "https://placehold.jp/100x142.png",
                chapterIds: [39, 40, 41],
                publishedAt: new Date("2026-01-24")
            }
        ]
    }
];
//# sourceMappingURL=data.js.map