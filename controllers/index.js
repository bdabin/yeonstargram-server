const { Router } = require('express');
const router = Router()

router.use('/api/account', require('./account'))
router.use('/api/auth', require('./auth'));

module.exports = router;