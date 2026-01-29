const db = require("../connection")

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`
      DROP TABLE IF EXISTS
    `); //<< write your first query in here.
};
module.exports = seed;
