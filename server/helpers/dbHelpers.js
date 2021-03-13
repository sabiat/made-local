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
      text: `SELECT * FROM shops JOIN categories ON categories.id = category_id WHERE categories.name = $1`,
      values: [`${category}`],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getShopsById = () => {};

  // const getUserByEmail = email => {

  //     const query = {
  //         text: `SELECT * FROM users WHERE email = $1` ,
  //         values: [email]
  //     }

  //     return db
  //         .query(query)
  //         .then(result => result.rows[0])
  //         .catch((err) => err);
  // }

  // const addUser = (firstName, lastName, email, password) => {
  //     const query = {
  //         text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
  //         values: [firstName, lastName, email, password]
  //     }

  //     return db.query(query)
  //         .then(result => result.rows[0])
  //         .catch(err => err);
  // }

  // const getUsersPosts = () => {
  //     const query = {
  //         text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
  //     FROM users
  //     INNER JOIN posts
  //     ON users.id = posts.user_id`
  //     }

  //     return db.query(query)
  //         .then(result => result.rows)
  //         .catch(err => err);

  // }

  return {
    getUsers,
    getShops,
    getCategories,
    getShopsByCategories,
    //getUserByEmail,
    //addUser,
    //getUsersPosts
  };
};
