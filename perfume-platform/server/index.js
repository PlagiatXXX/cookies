const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors()); app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/perfumes', require('./routes/perfumes'));
app.use('/api/ai', require('./routes/ai'));
app.listen(5000, () => console.log('Server 5000'));
