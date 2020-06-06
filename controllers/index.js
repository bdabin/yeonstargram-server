const { Router } = require('express');
const router = Router()

router.use('/api/account', require('./account'))
router.use('/api/board', require('./board'))


module.exports = router;