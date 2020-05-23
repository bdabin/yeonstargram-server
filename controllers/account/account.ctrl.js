const models = require('../../models');


exports.post_login = (req, res) => {

  models.User.findOne({
    where: { email: req.body.email }
  }).then(account => {
    if (account.password !== req.body.password) {
      res.send(404, '비밀번호가 일치하지 않습니다')
    } else {
      res.send('gkdl')
    }
  })
}

