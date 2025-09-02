# Case SuddenlySpaces Backend

## Overview

For the backend application I developed an API using TypeScript, Express, a MongoDB database and opted for a basic modular approach for project organization. Since the deadline was short, I opted for not implementing automated tests or a more robust architecture with dependency injection and following SOLID for lower coupling, but I still wanted to keep a somewhat high cohesion, so I ended up with the following layers:

- **Models:** since it's a data-focused app I just went with models that are both shaping the entities and reading/storing on the database.
- **Services:** this is where the main actions of the applications are defined, keeping all the models usage in a single layer.
- **Controllers:** this is where the requests are treated before sending the paylods to the services layer.

There's also the middlewares and route definitions within each module, and some shared services like for encryption and token signing (for authentication).

## Database

The database of choice was **MongoDB**. There were many reasons to choose MySQL or PostgreSQL, as they're perfect for the relational nature of the case and I'm also very experienced with both MySQL and PostgreSQL, but here are some of the reasons why I choose MongoDB instead:

- The companie's tech stack is probably going to use MongoDB and I'm also experienced with it.
- Depending on how the app grows and where it's going in terms of features, the flexibility and performance provided by MongoDB is a big plus.
- The deadline was also a factor, as I would be able to setup the backend quicker with MongoDB and the small scope would be covered perfectly by it's features.

## Run Instructions

Requirements: Node.js, npm and MongoDB installed.

1. Clone this repository and access it in the terminal.
```
git clone <this_repo>
cd suddenlyspaces-backend
```
2. Install the dependencies.
```
npm install
```
3. Copy the `.env.example` into a new `.env` file and fill in the environment variables (will throw if skipped, customize the values according to your environment).
```
PORT=3000

MONGODB_URL=mongodb://localhost:27017/case_suddenlyspaces

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1h
```
4. Run the development script.
```
npm run dev
```
5. Test it by accessing on http://localhost:3000/

## Improvements for a Production-ready Project

There are a lot of things I would improve for a production app. Some of them I mentioned before, like tests and better design with lesser coupling, but there are others that could be mentioned such as:

- **Security:** In a production environment we would need to rethink all security-related topics such as the authentication and authorization strategies, credentials storing, etc. But it's currently not bad either, it's very functional.
- **Nest.js (maybe):** It could be a good choice on larger teams, as it enforces a "right way" of doing things and has a lot (really, a lot) of great features and tools out-of-the-box. But this comes with the trade-off that the developers must know the framework, otherwise it could decrease productivity.
- **Docker (maybe):** It's a great tool for development and even for production deployment. I would dockerize the application if I had time.
- **Business Side:** There are a lot of new features that the app would have as a real production-ready project. To name a few:
  - richer properties, with media uploads for photos and videos.
  - the real risk score calculation, based on the user's history maybe.
  - storing more information about the tenants, like a history maybe.
  - in-app chat to secure the communication between tenants and landlords.
- there are way more, these are just from the top of my head (no AI used in this document)