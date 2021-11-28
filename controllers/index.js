const { Router } = require('express');
const express = require('express');
const path = require('path');
const router = Router();

router.use('/api/account', require('./account'));
router.use('/api/board', require('./board'));
router.use('/api/photo', require('./photo'));
router.use('/api/image', express.static(path.join(__dirname, '/../photos')));

module.exports = router;
