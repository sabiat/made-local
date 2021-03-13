DROP TABLE IF EXISTS chats CASCADE;
CREATE TABLE "chats" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id),
  "shop_id" INTEGER REFERENCES shops(id) 
);