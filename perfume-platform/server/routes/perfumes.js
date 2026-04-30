const express = require('express');
const db = require('../db');
const router = express.Router();
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM perfumes');
  res.json(result.rows);
});
router.post('/recommend', async (req, res) => {
  const { preferred_accords, max_budget } = req.body;
  const result = await db.query('SELECT * FROM perfumes WHERE price <= $1', [max_budget || 100000]);
  res.json(result.rows);
});
module.exports = router;
