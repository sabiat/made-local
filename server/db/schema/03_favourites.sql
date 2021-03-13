DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE "favourites" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id),
  "shop_id" INTEGER REFERENCES shops(id)
);