const { Router } = require('express');
const router = Router();
const passport = require('../../middleware/passport-facebook');

// 로컬호스트8080/auth/facebook 접근시 facebook으로 넘겨줌
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

// 인증후 페이스북에서 이 주소로 리턴해줌. 상단에 적은 callbackURL과 일치
router.get('/facebook/callback',
  passport.authenticate('facebook',
    {
      successRedirect: '/auth/facebook/success',
      failureRedirect: '/auth/facebook/fail'
    }
  )
);


router.get('/facebook/success', (req, res) => {
  res.send(req.user);
});

router.get('/facebook/fail', (req, res) => {
  res.send('facebook login fail');
});


module.exports = router;