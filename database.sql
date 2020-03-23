-- these are the tables neccessary for the database

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