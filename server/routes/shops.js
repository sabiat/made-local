const express = require("express");
const dbHelpers = require("../helpers/dbHelpers");
const router = express.Router();

module.exports = ({ getShops, getShopById, getMessagesByShopId }) => {
  router.get("/", (req, res) => {
    getShops()
      .then((shops) => res.json(shops))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id", (req, res) => {
    getShopById(req.params.id)
      .then((shops) => res.json(shops))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id/messages", (req, res) => {
    getMessagesByShopId(req.params.id)
      .then((shops) => res.json(shops))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
