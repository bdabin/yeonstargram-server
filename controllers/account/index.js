const { Router } = require('express');
const router = Router();
const ctrl = require('./account.ctrl');

router.get('/', ctrl.get_is_login);
router.post('/join', ctrl.post_join);
router.post('/login', ctrl.post_login);

module.exports = router;
