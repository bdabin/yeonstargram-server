const { Router } = require('express');
const router = Router();
const ctrl = require('./account.ctrl');
const passport = require('../../middleware/passport-local');
const upload = require('../../middleware/multer');

router.get('/', ctrl.get_is_login);
router.post('/join', ctrl.post_join);
router.post('/login', passport.authenticate('local'), ctrl.post_login);
router.post('/logout', ctrl.post_logout)

router.get('/follow/:id', ctrl.get_follow)
router.post('/follow/:id', ctrl.post_follow)
router.delete('/follow/:id', ctrl.delete_follow)

router.get('/mypage/:id', ctrl.get_mypage)

module.exports = router;
