const express = require('express');
const router = express.Router();
router.post('/chat', async (req, res) => {
  res.json({ message: { role: 'assistant', content: "Я ваш парфюмерный проводник. Расскажите о ваших предпочтениях." } });
});
module.exports = router;
