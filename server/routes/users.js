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

  router.post("/register", (req, res) => {
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

    registerUser(values).then((response) => {
      res.cookie("id", response.id);
      res.json(response);
    });
  });

  router.post("/login", (req, res) => {
    getUserByEmail(req.body.email)
      .then((response) => {
        if (
          req.body.email === response.email &&
          req.body.password === response.password
        ) {
          res.cookie("id", response.id);
          res.json(response);
        } else {
          console.log("here");
          res.json({ err: "Incorrect login" });
        }
      })
      .catch((err) => res.json(err));
  });

  router.post("/authenticate", (req, res) => {
    const id = req.cookies.id;

    if (id) {
      getUserById(id).then((response) => {
        res.json(response);
      });
    } else {
      res.json(null);
    }
  });
  router.post("/logout", (req, res) => {
    res.clearCookie("id");
    res.json({ msg: "Cookie erased" });
  });

  return router;
};
