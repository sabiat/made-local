DROP TABLE IF EXISTS shop_messages CASCADE;
CREATE TABLE "shop_messages" (
  "id" SERIAL PRIMARY KEY,
  "shop_id" INTEGER REFERENCES shops(id),
  "user_id" INTEGER REFERENCES users(id),
  "message_text" VARCHAR(255),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);