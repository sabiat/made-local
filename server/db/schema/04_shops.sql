DROP TABLE IF EXISTS shops CASCADE;
CREATE TABLE "shops" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT DEFAULT '',
  "street_address" VARCHAR(255) NOT NULL,
  "postal_code" VARCHAR(255) NOT NULL,
  "city" VARCHAR(255) NOT NULL,
  "latitude" INTEGER,
  "longitude" INTEGER,
  "phone_number" VARCHAR(255) NOT NULL,
  "social" VARCHAR(255) NOT NULL,
  "photo" VARCHAR(255) NOT NULL,
  "created at" VARCHAR(255),
  "user_id" INTEGER REFERENCES users(id),
  "delivery" BOOLEAN,
  "pickup" BOOLEAN,
  "shipping" BOOLEAN,
  "category_id" INTEGER REFERENCES categories(id)
);