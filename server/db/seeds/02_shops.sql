INSERT INTO shops (shop_id, title, description, image_url)
VALUES
(1, 'Best Little Italy Spots', 'These are the best spots to check out in the area', 'https://www.seetorontonow.com/wp-content/uploads/2020/02/Neighbourhoods-Little-Italy_image-1-1.jpg'),
(1, 'Best Poutines in Montreal', 'These are the best spots to get yourself some delicious Poutine!', 'https://www.mtlblog.com/u/2019/04/15/a8edc6fceabf572769744c0a78ed10b9.jpg_1200x630.jpg'),
(2, 'Best Parks in Toronto', 'Looking to chill at some green space? These are the places to go!', 'https://media.blogto.com/articles/202088-scarborough-bluffs.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70'),
(2, 'Paella Party', 'When you are too lazy to cook up the greatest dish in the world.', 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Spanish-Style-Paella_EXPS_FT20_39254_F_0311_1.jpg'),
(3, 'Double Feature', 'Remember the last time you grabbed popcorn and sat in a theatre? Neither do we! Here are great theatres that are not Cineplex.',
'https://tayloronhistory.files.wordpress.com/2013/12/royal.jpg'),
(3, 'Late Night Hype', 'I just really miss dancing with a beer in my hand...😭', 'https://mosmedia.azureedge.net/cache/0/4/7/f/3/2/047f321fcb728209ef74af23a43273186fa4b13f.jpg');



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
  "shipping" boolean