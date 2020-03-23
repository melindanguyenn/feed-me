# FeedMe Solo Project


## Description

This is a web application created to help find a recipe when you're on a budget or in a 'struggle meal' situation. Users will be able to find a recipe based on ingredients they currently have on hand. They'll be able add and edit notes to their favorite recipes. Users are required to have an account in order to favorite recipes. By logging in, they can view all recipes they've favorited and edit their account.

## Setup

Run the following commands in ternimal. The server and client will need two separate tabs and will automatically update after any changes.

```
npm install
npm run server
npm run client
```

Create the following tables in a database named `feedMe`:

```SQL
CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"email" VARCHAR (50) NOT NULL,
"password" VARCHAR (50) NOT NULL
);

CREATE TABLE "favorited" (
"id" SERIAL PRIMARY KEY,
"favorited_url" VARCHAR NOT NULL,
"user_id" INT REFERENCES "user"
);

CREATE TABLE "notes" (
"id" SERIAL PRIMARY KEY,
"notes" VARCHAR (500),
"favorited_id" INT REFERENCES "favorited",
"user_id" INT REFERENCES "user"
);
```

You'll also need an API Key from spoonacular [https://spoonacular.com/food-api] to replace the current key in `server/routes/recipe.router.js` to get any recipes to display.

## Technologies Used

- Javascript
- Node
- Express
- React
- Redux
- Sagas
- PostgreSQL
- CSS
- Nodemon


