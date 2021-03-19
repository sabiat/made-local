DROP TABLE IF EXISTS shop_photos CASCADE;
CREATE TABLE "shop_photos" (
  "id" SERIAL PRIMARY KEY,
  "shop_id" INTEGER REFERENCES shops(id),
  "photo_urls" VARCHAR(255)
);