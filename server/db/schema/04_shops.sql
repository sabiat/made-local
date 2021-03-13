DROP TABLE IF EXISTS shops CASCADE;
CREATE TABLE "shops" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "street_address" varchar NOT NULL,
  "postal_code" varchar NOT NULL,
  "city" varchar NOT NULL,
  "latitude" int,
  "longitude" int,
  "phone_number" varchar NOT NULL,
  "social" varchar NOT NULL,
  "photo" varchar NOT NULL,
  "created at" varchar,
  "user_id" int REFERENCES users(id),
  "delivery" boolean,
  "pickup" boolean,
  "shipping" boolean,
  "category_id" integer REFERENCES categories(id)
);