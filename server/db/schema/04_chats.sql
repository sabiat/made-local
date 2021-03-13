DROP TABLE IF EXISTS chats CASCADE;
CREATE TABLE "chats" (
  "id" int PRIMARY KEY,
  "user_id" int REFERENCES users(id),
  "shop_id" int REFERENCES shops(id) 
);