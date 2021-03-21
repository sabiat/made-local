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
  addFavouriteShop,
  removeFavouriteShop,
  getConversationsByUserId,
  getShopUserId,
  getConversationsByShopId,
  getUserShops,
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
  // route to get user favourites with id from cookie
  router.get("/favourites", (req, res) => {
    getUserFavourites(req.cookies.id)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/chats", (req, res) => {
    getShopUserId(req.cookies.id).then((resp) => {
      console.log("THIS IS THE GEN RES ", resp);
      if (resp.length > 0) {
        console.log("THIS IS THE RESP", resp[0].id);
        getConversationsByShopId(resp[0].id)
          .then((response) => {
            console.log("WE HAVE THIS", response);
            return res.json(response);
          })
          .catch((err) =>
            res.json({
              error: err.message,
            })
          );
      } else {
        getConversationsByUserId(req.cookies.id)
          .then((resp) => {
            console.log("THIS IS WHAT WE WAANT", resp);
            return res.json(resp);
          })
          .catch((err) =>
            res.json({
              error: err.message,
            })
          );
      }
    });
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
  // route to get user favourites with id from endpoint
  router.get("/:id/favourites", (req, res) => {
    getUserFavourites(req.params.id)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id/shops", (req, res) => {
    getUserShops(req.params.id)
      .then((shops) => res.json(shops))
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/:id/favourites", (req, res) => {
    addFavouriteShop(req.body.user_id, req.body.shop_id)
      .then((favourites) => {
        getUserFavourites(req.body.user_id).then((favourites) => {
          res.json(favourites);
        });
      })
      .catch((err) => res.json({ error: err.message }));
  });

  router.delete("/:id/favourites", (req, res) => {
    removeFavouriteShop(req.body.user_id, req.body.shop_id)
      .then((favourites) => res.json(favourites))
      .catch((err) => res.json({ error: err.message }));
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
      photo,
      password,
      confirmPassword,
    } = req.body;

    const values = [
      username,
      firstName,
      lastName,
      email,
      photo,
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
