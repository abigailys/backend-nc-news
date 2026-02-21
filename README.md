# NC News API

## Summary

NC News is a RESTful API built to provide data for a community-led news platform. It allows users to interact with news articles, browse topics, post comments, and cast votes. 

The project follows the **MVC (Model-View-Controller)** architecture and uses a **U-turn pattern** for robust request-response handling. It is built with a focus on data integrity, comprehensive error handling (400, 404, 500), and protection against SQL injection. 

## Live Link
View the hosted API documentation here: https://nc-news-abigail.onrender.com/api/

## Requirements

To run this project locally, you will need the following minimum versions:

- **Node.js**: v18.0.0 or higher
- **Postgres**: v14.0 or higher

## Installation and Setup

### 1. Clone the respository
```bash
git clone https://github.com/abigailys/backend-nc-news
cd backend-nc-news
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure database
`.env` files are ignored by Git, anyone who cloned this project will not have access to the required environment variables. To set up, create two `.env` files for your databases:

.env.test:
```
PGDATABASE=nc_news_test
``` 

.env.development:
``` 
PGDATABASE=nc_news
``` 
Note: Double-check that your .gitignore file includes .env.* so these files aren't pushed to GitHub.

### 4. Setup and Seed
Run the following commands to create the databases and fill the development database with initial data.
```bash
npm run setup-dbs
npm run seed
```

### 5. Run the Test Sute
Ensure the API is functioning correctly by running the tests:
```npm test```

### 6. Start the Server
Run the server in development mode (using Nodemon):
```npm run dev```

The documentation will be available at http://localhost:9090/api.


## API Endpoints


| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api` | Responds with JSON/HTML describing all available endpoints. |
| **GET** | `/api/topics` | Responds with an array of all topics. |
| **GET** | `/api/articles` | Responds with all articles (supports `topic`, `sort_by`, and `order` queries). |
| **GET** | `/api/articles/:article_id` | Responds with a single article object including `comment_count`. |
| **GET** | `/api/articles/:article_id/comments` | Responds with an array of comments for a specific article. |
| **POST** | `/api/articles/:article_id/comments` | Adds a new comment to an article (requires `username` and `body`). |
| **PATCH** | `/api/articles/:article_id` | Updates article votes (accepts `{ inc_votes: newVote }`). |
| **DELETE** | `/api/comments/:comment_id` | Deletes a comment by ID (returns 204 No Content). |
| **GET** | `/api/users` | Responds with an array of all user objects. |

---

## Implementation Details

### TDD (Test Driven Development)
Developed using a strict **Red-Green-Refactor** workflow to ensure high code coverage and reliability across all endpoints.

### SQL Injection Protection
All queries are **parameterised** using `$1` syntax or protected by **whitelist arrays** for identifiers like column names and sort orders.

### Dynamic Queries
The articles endpoint supports advanced filtering and sorting logic built with **dynamic SQL string construction** to handle multiple optional queries simultaneously.

### Relational Integrity
Uses `Promise.all` and **cross-model existence checks** to ensure appropriate **404 errors** are triggered when resources (like articles or users) are missing.

### Error Handling
**Centralised middleware** in `app.js` handles custom status codes, PSQL-specific errors (such as foreign key violations), and 500 safety nets.