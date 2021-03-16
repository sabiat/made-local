const express = require("express");
const dbHelpers = require("../helpers/dbHelpers");
const router = express.Router();

module.exports = ({ getShops, getShopById, getMessagesByShopId, registerShop }) => {
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

  router.post("/", (req, res) => {
    const { name, description, streetAddress, postalCode, city, longitude, latitude, phoneNumber, social, photo, delivery, pickup, shipping, category } = req.body;

    const values = [name, description, streetAddress, postalCode, city, latitude, longitude, phoneNumber, social, photo, 1, delivery, pickup, shipping, category];
    registerShop(values)
  })

  return router;
};
