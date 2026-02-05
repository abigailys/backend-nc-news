# NC News Seeding

This repo is 

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