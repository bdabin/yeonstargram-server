const { Router } = require('express');
const router = Router();
const ctrl = require('./account.ctrl');

// router.get('/join', ctrl.post_join);
router.post('/join', ctrl.post_join);

module.exports = router;