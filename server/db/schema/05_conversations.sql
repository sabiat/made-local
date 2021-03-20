DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE "conversations" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id),
  "shop_id" INTEGER REFERENCES shops(id) 
);