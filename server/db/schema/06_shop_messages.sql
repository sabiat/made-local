DROP TABLE IF EXISTS shop_messages CASCADE;
CREATE TABLE "shop_messages" (
  "id" SERIAL PRIMARY KEY,
  "shop_id" int REFERENCES shops(id),
  "user_id" int REFERENCES users(id),
  "message_text" varchar,
  "created_at" timestamp
);