const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email', [email, hashedPassword]);
  const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);
  res.status(201).json({ user: result.rows[0], token });
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows[0] && await bcrypt.compare(password, result.rows[0].password_hash)) {
    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);
    res.json({ user: { id: result.rows[0].id, email: result.rows[0].email }, token });
  } else res.status(401).json({ error: 'Invalid' });
});
module.exports = router;
