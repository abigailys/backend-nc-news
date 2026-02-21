# NC News API

## Summary

NC News is a RESTful API built to provide data for a community-led news platform. It allows users to interact with news articles, browse topics, post comments, and cast votes. 

The project follows the **MVC (Model-View-Controller)** architecture and uses a **U-turn pattern** for robust request-response handling. It is built with a focus on data integrity, comprehensive error handling (400, 404, 500), and protection against SQL injection. 

## Live Link
View the hosted API documentation here: https://nc-news-abigail.onrender.com/api/

## Installation and Setup

### 1. Clone the respository
```
git clone https://github.com/abigailys/backend-nc-news
cd backend-nc-news
```



# Setting up environment variables
.env files are ignored by Git, anyone who cloned this project will not have access to the required environment variables. To set up, create two .env files for your databases:
    .env.test (for the test database)
    .env.development (for the development database)

Note: Double-check that your .gitignore file includes .env.* so these files aren't pushed to GitHub.

To connect to both test and development databases locally, specify these in your .env files, referring to database names specified in the setup-dbs.sql file.
    `PGDATABASE=nc_news_test` in .env.test, and
    `PGDATABASE=nc_news` in .env.development


npm i -D supertest
npm i express