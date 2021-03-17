const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
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
  registerUser,
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
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = req.body;

    const values = [
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    ];

    registerUser(values).then((res) => {
      res.json(res.rows[0]);
    });
  });

  router.post("/login", (req, res) => {
    // console.log("here", req.body);
    res.json(req.body);
  });

  return router;
};
