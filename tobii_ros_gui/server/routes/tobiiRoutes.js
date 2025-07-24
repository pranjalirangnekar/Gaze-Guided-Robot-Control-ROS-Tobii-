const express = require('express');
const router = express.Router();
const { checkConnection, liveFeed } = require('../controllers/tobiiController');

router.get('/check-connection', checkConnection);
router.get('/live-feed', liveFeed);

module.exports = router;
