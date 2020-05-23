const { Router } = require('express');
const router = Router();
const ctrl = require('./account.ctrl');

router.get('/login', ctrl.get_login);
router.post('/login', ctrl.post_login);

module.exports = router;


