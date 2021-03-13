const express = require('express');
const dbHelpers = require('../helpers/dbHelpers');
const router = express.Router();

module.exports = ({
  getShops
}) => {
  router.get('/', (req, res) => {
      getShops()
          .then((shops) => res.json(shops))
          .catch((err) => res.json({
              error: err.message
          }));
  });
  return router;
};