const db = require("../connection")

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS articles;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS topics;
    `)
    .then(() => {
      return db.query(`
        CREATE TABLE topics (
          slug SERIAL PRIMARY KEY,
          description TEXT,
          img_url TEXT
        );
        
        CREATE TABLE users (
          username VARCHAR(30) PRIMARY KEY,
          name VARCHAR(100),
          avatar_url TEXT
        );

        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR(100),
          topic VARCHAR(100),
          author VARCHAR(50),
          body TEXT,
          created_at TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url TEXT
        );

        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          article_id INT,
          body TEXT,
          votes INT DEFAULT 0,
          author VARCHAR(50),
          created_at TIMESTAMP
        )
        `)
    })
};
module.exports = seed;
