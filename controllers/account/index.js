const { Router } = require('express');
const router = Router();
const ctrl = require('./account.ctrl');
const passport = require('../../middleware/passport-local');

router.get('/', ctrl.get_is_login);
router.post('/join', ctrl.post_join);
router.post('/login' , passport.authenticate('local'),ctrl.post_login);
router.post('/logout',ctrl.post_logout)


module.exports = router;
