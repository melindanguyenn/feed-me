# FeedMe Solo Project


## Description

This is a web application created to help find a recipe when you're on a budget or in a 'struggle meal' situation. Users will be able to find a recipe based on ingredients they currently have on hand. They'll be able add and edit notes to their favorite recipes. Users are required to have an account in order to favorite recipes. By logging in, they can view all recipes they've favorited and edit their account.

## Setup

Install the "C#" extension in Visual Studio Code, then do a `npm install` in the terminal. Go to VS Code's debugger and click run. Once that is running, return to the terminal and run `npm run client`.

Create the following tables in a database named `feedMe`:

```SQL
CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"email" VARCHAR (50) NOT NULL,
"password" VARCHAR (50) NOT NULL
);

CREATE TABLE "favorited" (
"id" SERIAL PRIMARY KEY,
"recipe_id" INT NOT NULL,
"favorited_title" VARCHAR (50) NOT NULL,
"user_id" INT REFERENCES "user"
);

CREATE TABLE "notes" (
"id" SERIAL PRIMARY KEY,
"notes" VARCHAR (500),
"favorited_id" INT REFERENCES "favorited",
"user_id" INT REFERENCES "user"
);
```

You'll also need an API Key from spoonacular [https://spoonacular.com/food-api] to insert the key in `feed-me/FeedMeC#/FeedMe.API/appsettings.json` to get any recipes to display.

## Technologies Used

- React
- C#
- Dapper
- PostgreSQL
- CSS
- BootStrap