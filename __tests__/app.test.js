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
            expect(body.topics).toBeArray();
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
            // const abc = await request(app).get("/api/articles")
            // console.log(abc)
            const { body } = await request(app)
                .get("/api/articles")
                .expect(200)
            expect(body.articles).toBeArray();
        });

        test("Each article object has properties: author, title, article_id, topic, created_at, votes, article_img_url", async () => {
            const { body: { articles } } = await request(app)
                .get("/api/topics");
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
                .get("/api/topics");
            articles.forEach((article) => {
                expect(article.comment_count).toBeNumber();
            });
        });

        test("Each article object does not have property: body", async () => {
            const { body: { articles } } = await request(app)
                .get("/api/topics");
            articles.forEach((article) => {
                expect(article).not.toHaveProperty("body");
            });
        });
    })
})