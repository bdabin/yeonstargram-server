const { Router } = require('express');
const router = Router();
const ctrl = require('./account.ctrl');

// 미들웨어 
function testMiddleWare(req, res, next) {
  console.log('미들웨어 작동');
  next();
}


// router.get('/join', ctrl.post_join);
router.post('/join', ctrl.post_join);
router.post('/login', testMiddleWare, ctrl.post_login);

module.exports = router;


