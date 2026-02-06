const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js")

beforeEach(() => {
    return seed(data);
})

afterAll(() => {
    return db.end();
})

describe("/api/topics", () => {
    describe("GET", () => {
        test("200 - Responds with an array on the key of topics", async () => {
            const { body } = await request(app)
                .get("/api/topics")
                .expect(200);
            expect(body.topics).toBeArray(); // Implicitly confirming body is an object with the key of topics
        });

        test("Each topic object has properties: slug, description, img_url", async () => {
            const { body: { topics } } = await request(app)
                .get("/api/topics");
            topics.forEach((topic) => {
                expect(topic.slug).toBeString();
                expect(topic.description).toBeString();
                expect(topic.img_url).toBeString();
            });
        });
    })
})

describe("/api/articles", () => {
    describe("GET", () => {
        test("200 - Responds with an array on the key of articles", async () => {
            const { body } = await request(app)
                .get("/api/articles")
                .expect(200)
            expect(body.articles).toBeArray();
        });

        test("Each article object has properties: author, title, article_id, topic, created_at, votes, article_img_url", async () => {
            const { body: { articles } } = await request(app)
                .get("/api/articles");
            articles.forEach((article) => {
                expect(article.author).toBeString();
                expect(article.title).toBeString();
                expect(article.article_id).toBeNumber();
                expect(article.topic).toBeString();
                expect(article.created_at).toBeString();
                expect(article.votes).toBeNumber();
                expect(article.article_img_url).toBeString();
            });
        });

        test("Each article object has properties: comment_count", async () => {
            const { body: { articles } } = await request(app)
                .get("/api/articles");
            articles.forEach((article) => {
                expect(article.comment_count).toBeNumber();
            });
        });

        test("Each article object does not have property: body", async () => {
            const { body: { articles } } = await request(app)
                .get("/api/articles");
            articles.forEach((article) => {
                expect(article).not.toHaveProperty("body");
            });
        });

        test("Array of article objects are sorted by date in descending order", async () => {
            const { body: { articles } } = await request(app)
                .get("/api/articles");
            expect(articles).toBeSortedBy("created_at", {
                descending: true,
            });
        })
    })

    describe("/:article_id", () => {
        describe("GET", () => {
            test("200 - Responds with the correct article object", async () => {
                const { body: { article } } = await request(app)
                    .get("/api/articles/5")
                    .expect(200)
                expect(article.article_id).toBe(5);

            })
        })

        test("Article object has properties: author, title, article_id, body, topic, created_at, votes, article_img_url", async () => {
            const { body: { article } } = await request(app)
                .get("/api/articles/7")
                .expect(200)
            expect(article.author).toBeString();
            expect(article.title).toBeString();
            expect(article.article_id).toBe(7);
            expect(article.body).toBeString();
            expect(article.topic).toBeString();
            expect(article.created_at).toBeString();
            expect(article.votes).toBeNumber();
            expect(article.article_img_url).toBeString();
        })
    })

})


describe("/api/users", () => {
    describe("GET", () => {
        test("200 - Responds with an array on the key of users", async () => {
            const { body } = await request(app)
                .get("/api/users")
                .expect(200)
            expect(body.users).toBeArray();
        });

        test("Each user object has properties: username, name, avatar_url", async () => {
            const { body: { users } } = await request(app)
                .get("/api/users")
                .expect(200)
            users.forEach((user) => {
                expect(user.username).toBeString();
                expect(user.name).toBeString();
                expect(user.avatar_url).toBeString();
            })
        });
    })
})
