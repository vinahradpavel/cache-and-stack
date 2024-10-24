/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const Cache = require('../../models/Cache');
const { ITEM_DELETED_SUCCESSFULLY, ITEM_SUCCESSFULLY_ADDED } = require('../../utils/constants');

const router = express.Router();
const cache = new Cache();

router.get('/:key', async (req, res) => {
  const { params: { key } } = req;
  const cacheItem = cache.get(key);

  return res.status(200).json({
    cacheItem,
  });
});

router.post('/push', async (req, res) => {
  const { body: { key, value } } = req;
  cache.set(key, value);

  return res.status(200).json({
    message: ITEM_SUCCESSFULLY_ADDED,
  });
});

router.delete('/:key', async (req, res) => {
  const { params: { key } } = req;
  cache.delete(key);

  return res.status(200).json({
    message: ITEM_DELETED_SUCCESSFULLY,
  });
});

module.exports = router;
