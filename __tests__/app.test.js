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

        describe("Sorting queries", () => {
            test("200 - Sorts by specified sort_by query", async () => {
                const { body: { articles } } = await request(app)
                    .get("/api/articles?sort_by=title")
                    .expect(200)
                expect(articles).toBeSortedBy("title", {
                    descending: true
                })
            })

            test("200 - Sorts by specified ascending order", async () => {
                const { body: { articles } } = await request(app)
                    .get("/api/articles?order=asc")
                    .expect(200)
                expect(articles).toBeSortedBy("created_at", {
                    descending: false
                })
            })

            test("400 - responds with error for invalid sort_by query", async () => {
                const { body } = await request(app)
                    .get("/api/articles?sort_by=not-a-column")
                    .expect(400);
                expect(body.message).toBe("Bad Request");
            })

            test("400 - responds with error for invalid order query", async () => {
                const { body } = await request(app)
                    .get("/api/articles?order=not-an-accepted-order")
                    .expect(400);
                expect(body.message).toBe("Bad Request");
            })
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

        describe("PATCH", () => {
            test("Updates the correct article with new vote count", async () => {
                const { body: { updatedArticle } } = await request(app)
                    .patch("/api/articles/2")
                    .send({ inc_votes: 2 })
                expect(updatedArticle.article_id).toBe(2);
                expect(updatedArticle.votes).toBe(2);
            })

            test("200 - Responds with the updated article", async () => {
                const { body: { updatedArticle } } = await request(app)
                    .patch("/api/articles/1")
                    .send({ inc_votes: -50 })
                    .expect(200)
                expect(updatedArticle.article_id).toBe(1);
                expect(updatedArticle.topic).toBeString();
                expect(updatedArticle.author).toBeString();
                expect(updatedArticle.body).toBeString();
                expect(updatedArticle.created_at).toBeString();
                expect(updatedArticle.title).toBeString();
                expect(updatedArticle.votes).toBe(50);
                expect(updatedArticle.article_img_url).toBeString();
            })
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

                    const { body: { comment } } = await request(app)
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

                test("404 - Responds with an error when username does not exist", async () => {
                    const { body } = await request(app)
                        .post("/api/articles/3/comments")
                        .send({ username: "not-a-valid-user", body: "Hello, I am adding a comment from supertest." })
                        .expect(404)
                    expect(body.message).toBe("User Not Found");

                });

                test("400 - Responds with an error when no username is passed in", async () => {
                    const { body } = await request(app)
                        .post("/api/articles/3/comments")
                        .send({ body: "Hello, I am adding a comment from supertest." })
                        .expect(400)
                    expect(body.message).toBe("Bad Request");
                });

                test("400 - Responds with an error when no comment body is passed in", async () => {
                    const validUser = testData.userData[0].username

                    const { body } = await request(app)
                        .post("/api/articles/3/comments")
                        .send({ username: validUser })
                        .expect(400)
                    expect(body.message).toBe("Bad Request");
                });
            })
        })
    })

})

describe("/api/comments", () => {
    describe("/:comment_id", () => {
        describe("GET", () => {
            test("200 - Responds with the correct comment object", async () => {
                const { body: { comment } } = await request(app)
                    .get("/api/comments/1")
                    .expect(200)
                expect(comment.comment_id).toBe(1);
            })

            test("Comment object has properties: comment_id, article_id, body, votes, author, created_at", async () => {
                const { body: { comment } } = await request(app)
                    .get("/api/comments/2")
                expect(comment.comment_id).toBe(2);
                expect(comment.article_id).toBeNumber();
                expect(comment.body).toBeString();
                expect(comment.votes).toBeNumber();
                expect(comment.author).toBeString();
                expect(comment.created_at).toBeString();
            })
        })
    })

    describe("DELETE", () => {
        test("204 - Deletes the given comment by comment_id and responds with no content", async () => {
            await request(app)
                .get("/api/comments/2")
                .expect(200)

            const { body } = await request(app)
                .delete("/api/comments/2")
                .expect(204)
            expect(body).toEqual({});

            await request(app)
                .get("/api/comments/2")
                .expect(404)
        });
    })
})

describe("/api/users", () => {
    describe("/:username", () => {
        describe("GET", () => {
            test("200 - Responds with the correct user object, has properties: username, name, avatar_url", async () => {
                const validUser = testData.userData[0].username
                const { body: { user } } = await request(app)
                    .get(`/api/users/${validUser}`)
                    .expect(200)
                expect(user.username).toBe(validUser);
                expect(user.name).toBeString();
                expect(user.avatar_url).toBeString();
            })

            test("404 - Responds with an error when user does not exist", async () => {
                const { body } = await request(app)
                    .get("/api/users/non-existent-user")
                    .expect(404);

                expect(body.message).toBe("User Not Found");
            });
        })
    })
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
