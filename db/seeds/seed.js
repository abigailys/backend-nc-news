const db = require("../connection")
const format = require("pg-format")
const {createLookupObject} = require("./seedUtils.js")

async function seed({ topicData, userData, articleData, commentData }) {
  // 1. Drop existing tables
  await db.query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS articles;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS topics;
    `)

  // 2. Create new tables
  await db.query(`
        CREATE TABLE topics (
          slug VARCHAR(100) PRIMARY KEY,
          description VARCHAR,
          img_url VARCHAR(1000)
        );
        
        CREATE TABLE users (
          username VARCHAR(30) PRIMARY KEY,
          name VARCHAR(100),
          avatar_url VARCHAR(1000)
        );

        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR(100),
          topic VARCHAR(100) REFERENCES topics(slug) ON DELETE SET NULL,
          author VARCHAR(50) REFERENCES users(username) ON DELETE SET NULL,
          body TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url VARCHAR(1000)
        );

        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          article_id INT NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
          body TEXT,
          votes INT DEFAULT 0,
          author VARCHAR(50) REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `)

  // 3. Insert topic data
  const formattedTopics = topicData.map((topic) => {
    return [topic.slug, topic.description, topic.img_url]
  })
  const topicQueryStr = format(`INSERT INTO topics (slug, description, img_url) VALUES %L`, formattedTopics)

  await db.query(topicQueryStr);

  // 4. Insert user data
  const formattedUsers = userData.map((user) => {
    return [user.username, user.name, user.avatar_url]
  })

  const userQueryStr = format(`INSERT INTO users (username, name, avatar_url) VALUES %L`, formattedUsers)

  await db.query(userQueryStr);


  // 5. Insert article data
  const formattedArticles = articleData.map((article) => {
    return [article.title, article.topic, article.author, article.body, article.created_at, article.votes, article.article_img_url]
  })
  const articleQueryStr = format('INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L', formattedArticles);
  await db.query(articleQueryStr);

  // 5. Insert comment data
  articleData = await db.query(`SELECT * FROM articles`)
  const articlesLookup = createLookupObject(articleData.rows, "title", "article_id")

  const formattedComments = commentData.map((comment) => {
    const articleId = articlesLookup[comment.article_title]
    return [articleId, comment.body, comment.votes, comment.author, comment.created_at]
  })

  const commentQueryStr = format('INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *', formattedComments)
  await db.query(commentQueryStr);

};
module.exports = seed;
