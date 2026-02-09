const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js")

const testData = require("../db/data/test-data/index.js")

beforeEach(() => {
    return seed(data);
})

afterAll(() => {
    return db.end();
})

describe("Invalid Endpoint Error Handling", () => {
    test("404 - Responds with an error message when path is not found", async () => {
        const { body } = await request(app)
            .get("/api/invalid-path")
            .expect(404)
        expect(body.message).toBe("Path Not Found")
    })
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

            test("400 - Responds with an error when article_id is not a valid data type", async () => {
                const { body } = await request(app)
                    .get("/api/articles/not-an-id")
                    .expect(400);

                expect(body.message).toBe("Bad Request");
            });

            test("404 - Responds with an error when article_id is a valid number but does not exist", async () => {
                const { body } = await request(app)
                    .get("/api/articles/999")
                    .expect(404);

                expect(body.message).toBe("ID Not Found");
            });


        })

        describe("/comments", () => {
            describe("GET", () => {
                test("200 - Responds with an array on the key of comments", async () => {
                    const { body } = await request(app)
                        .get("/api/articles/1/comments")
                        .expect(200)
                    expect(body.comments).toBeArray();
                });

                test("Array of comments corresponds to the correct article_id", async () => {
                    const { body: { comments } } = await request(app)
                        .get("/api/articles/2/comments")
                    comments.forEach((comment) => {
                        expect(comment.article_id).toBe(2);
                    })
                });

                test("Each comment object has properties: comment_id, votes, created_at, author, body, article_id", async () => {
                    const { body: { comments } } = await request(app)
                        .get("/api/articles/3/comments")
                    comments.forEach((comment) => {
                        expect(comment.comment_id).toBeNumber();
                        expect(comment.votes).toBeNumber();
                        expect(comment.created_at).toBeString();
                        expect(comment.author).toBeString();
                        expect(comment.body).toBeString();
                        expect(comment.article_id).toBe(3);
                    })
                })

                test("Array of comments are sorted by created_at in descending order", async () => {
                    const { body: { comments } } = await request(app)
                        .get("/api/articles/2/comments")
                        .expect(200)
                    expect(comments).toBeSortedBy("created_at", {
                        descending: true
                    });
                })

                test("400 - Responds with an error when article_id is not a valid data type", async () => {
                    const { body } = await request(app)
                        .get("/api/articles/not-an-id/comments")
                        .expect(400);
                    expect(body.message).toBe("Invalid article ID");
                });

                test("404 - Responds with an error when article_id is a valid number but does not exist", async () => {
                    const { body } = await request(app)
                        .get("/api/articles/999/comments")
                        .expect(404);
                    expect(body.message).toBe("ID Not Found");
                });

            })

            describe("POST", () => {
                test("Adds the correct comment username and comment body to the correct article", async () => {
                    const validUser = testData.userData[0].username
                    
                    const { body: { comment }}  = await request(app)
                        .post("/api/articles/3/comments")
                        .send({ username: validUser, body: "Hello, I am adding a comment from supertest." })
                    expect(comment.article_id).toBe(3);
                    expect(comment.author).toBe(validUser);
                    expect(comment.body).toBe("Hello, I am adding a comment from supertest.");
                });

                test("201 - Responds with the posted comment", async () => {
                    const validUser = testData.userData[0].username
                    
                    const { body: { comment } } = await request(app)
                        .post("/api/articles/2/comments")
                        .send({ username: validUser, body: "Hello again, I am adding another comment from supertest." })
                        .expect(201)
                    expect(comment.article_id).toBe(2);
                    expect(comment.author).toBe(validUser);
                    expect(comment.body).toBe("Hello again, I am adding another comment from supertest.");
                    expect(comment.comment_id).toBeNumber();
                    expect(comment.votes).toBe(0);
                    expect(comment.created_at).toBeString();
                });
            })
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
