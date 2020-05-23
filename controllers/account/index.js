const { Router } = require('express');
const router = Router();
const ctrl = require('./.ctrl');

router.post('/login', ctrl.post_login);

module.exports = router;


