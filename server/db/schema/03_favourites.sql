DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE "favourites" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int REFERENCES users(id),
  "shop_id" int REFERENCES shops(id)
);