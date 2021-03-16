const express = require("express");
const router = express.Router();
const { getPostsByUsers } = require("../helpers/dataHelpers");
const dbHelpers = require("../helpers/dbHelpers");

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  getUsersPosts,
  getUserById,
  getUserFavourites,
  registerUser
}) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id", (req, res) => {
    getUserById(req.params.id)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id/favourites", (req, res) => {
    console.log(req.params.id);
    getUserFavourites(req.params.id)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/posts", (req, res) => {
    getUsersPosts()
      .then((usersPosts) => {
        const formattedPosts = getPostsByUsers(usersPosts);
        res.json(formattedPosts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const { username, firstName, lastName, email, password, confirmPassword } = req.body;

    const values = [username, firstName, lastName, email, password, confirmPassword]
    // console.log("inside post", req.body)

    registerUser(values)
    .then((res) => {res.send('added')})
  });

  return router;
};
