const { Router } = require('express');
const router = Router()

router.use('/api/account', require('./account'))
router.use('/api/board', require('./board'))
// router.use('/api/mypage', require('./mypage'))


module.exports = router;