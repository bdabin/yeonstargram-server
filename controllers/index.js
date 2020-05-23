const { Router } = require('express');
const router = Router()

router.use('/api/account', require('./account'))

module.exports = router;