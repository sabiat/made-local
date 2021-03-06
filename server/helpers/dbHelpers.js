module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getShops = () => {
    const query = {
      text: "SELECT * FROM shops",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCategories = () => {
    const query = {
      text: "SELECT * FROM categories",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getShopsByCategories = (category) => {
    const query = {
      text: `SELECT shops.* FROM shops JOIN categories ON categories.id = category_id WHERE categories.name = $1`,
      values: [`${category}`],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getUserFavourites = (id) => {
    const query = {
      text: `SELECT shops.*, favourites.*, users.user_name AS user_name 
      FROM favourites
      JOIN shops ON favourites.shop_id = shops.id 
      JOIN users ON favourites.user_id = users.id 
      WHERE favourites.user_id = $1;`,
      values: [`${id}`],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserShops = (id) => {
    const query = {
      text: `SELECT shops.*, users.user_name AS user_name 
      FROM shops
      JOIN users ON shops.user_id = users.id 
      WHERE shops.user_id = $1;`,
      values: [`${id}`],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addFavouriteShop = (user_id, shop_id) => {
    const query = {
      text: `INSERT INTO favourites (user_id, shop_id) 
      VALUES ($1, $2) RETURNING *`,
      values: [user_id, shop_id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const removeFavouriteShop = (user_id, shop_id) => {
    return db
      .query(`DELETE FROM favourites WHERE shop_id = $1 AND user_id = $2`, [
        shop_id,
        user_id,
      ])
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getShopById = (id) => {
    const query = {
      text: `SELECT shops.*
    FROM shops
    WHERE id = $1;`,
      values: [`${id}`],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getShopUserId = (user_id) => {
    const query = {
      text: `SELECT shops.id from shops
      WHERE shops.user_id = $1
      `,
      values: [`${user_id}`],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getConversationsByShopId = (shop_id) => {
    return db
      .query(
        `SELECT conversations.id AS id, 
        conversations.user_id, 
        conversations.shop_id,
        chat_messages.message_text AS message,
        chat_messages.user_id AS from,
        shops.name AS shopname
        FROM conversations
        INNER JOIN chat_messages ON conversations.id = chat_messages.conversation_id
        INNER JOIN users ON users.id = conversations.user_id
        INNER JOIN shops ON shops.id = conversations.shop_id
        WHERE shop_id = $1`,
        [shop_id]
      )
      .then((result) => {
        return result.rows;
      })
      .catch((err) => err);
  };

  const getMessagesByShopId = (id) => {
    const query = {
      text: `SELECT shop_messages.*, users.user_name AS user_name, users.photo AS photo
    FROM shop_messages
    JOIN users ON shop_messages.user_id = users.id
    WHERE shop_id = $1;`,
      values: [`${id}`],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getConversationsByUserId = (user_id) => {
    const query = {
      text: `SELECT (conversations.*),
      chat_messages.message_text AS message,
      shops.name AS shopName,
      users.user_name AS from
      
      FROM conversations

      JOIN chat_messages ON conversations.id = chat_messages.conversation_id
      JOIN users ON users.id = chat_messages.user_id
      JOIN shops ON shops.id = conversations.shop_id
      WHERE conversations.user_id = $1
      `,
      values: [`${user_id}`],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addShopMessages = (values) => {
    return db
      .query(
        `INSERT INTO shop_messages (shop_id, user_id, message_text)
        VALUES ($1, $2, $3)
        RETURNING *`,
        values
      )
      .then((res) => res.rows[0])
      .catch((err) => err);
  };

  const registerUser = (values) => {
    return db
      .query(
        `INSERT INTO users (user_name, first_name, last_name, email, photo, password, password_confirmation)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
        values
      )
      .then((res) => res.rows[0])
      .catch((err) => err);
  };

  const registerShop = (params) => {
    let category = params[params.length - 1];
    const query = {
      text: `SELECT categories.id FROM categories WHERE categories.name = $1`,
      values: [`${category}`],
    };
    return db
      .query(query)
      .then((result) => {
        params[params.length - 1] = result.rows[0].id;
        db.query(
          `INSERT INTO shops (name, description, street_address, postal_code, city, latitude, longitude, phone_number, social, photo, user_id, delivery, pickup, shipping, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
          params
        );
      })
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return err.message;
      });
  };

  const getUserById = (id) => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => err);
  };

  const getPhotosByShopId = (id) => {
    const query = {
      text: `SELECT * FROM shop_photos  WHERE shop_id = $1;`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => err);
  };

  const addPhotosToShop = (url, shopId) => {
    return db
      .query(
        `INSERT INTO shop_photos (shop_id, photo_urls) VALUES ($1, $2) RETURNING *`,
        [shopId, url]
      )
      .then((result) => {
        result.rows;
      })
      .catch((err) => err);
  };

  return {
    getUsers,
    getShops,
    getCategories,
    getShopsByCategories,
    getUserById,
    getUserFavourites,
    getShopById,
    getMessagesByShopId,
    registerUser,
    registerShop,
    getUserByEmail,
    addFavouriteShop,
    addShopMessages,
    removeFavouriteShop,
    getPhotosByShopId,
    addPhotosToShop,
    getConversationsByUserId,
    getShopUserId,
    getConversationsByShopId,
    getUserShops,
  };
};
