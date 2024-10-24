const express = require('express');
const Stack = require('../../models/Stack');
const { ITEM_SUCCESSFULLY_ADDED } = require('../../utils/constants');

const router = express.Router();
const stack = new Stack();

router.get('/', (req, res) => {
  const element = stack.pop();

  return res.status(200).json({
    element,
  });
});

router.post('/push', (req, res) => {
  const { body: { element } } = req;
  stack.push(element);

  return res.status(200).json({
    message: ITEM_SUCCESSFULLY_ADDED,
  });
});

module.exports = router;
