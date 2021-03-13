DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "password_confirmation" varchar NOT NULL,
  "created_at" timestamp
);