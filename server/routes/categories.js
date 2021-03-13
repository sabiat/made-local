const express = require("express");
const dbHelpers = require("../helpers/dbHelpers");
const router = express.Router();

module.exports = ({ getCategories, getShopsByCategories }) => {
  router.get("/", (req, res) => {
    getCategories()
      .then((categories) => res.json(categories))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id", (req, res) => {
    const category = req.params.id;
    console.log(category);
    getShopsByCategories(category)
      .then((shops) => res.json(shops))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
