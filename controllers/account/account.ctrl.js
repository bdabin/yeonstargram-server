const models = require('../../models')
const passwordHash = require('../../helpers/passwordHash');

exports.post_join = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.send(400, '입력을 제대로 하지 않았습니다.')
    return
  }

  const createUser = () => {
    models.User.create(req.body).then(() => {
      res.send(200, req.body)
    })
  }

  models.User.findOne({ where: { email: req.body.email } })
    .then(data => {
      if (data) {
        res.send(400, '이미 가입된 이메일이 있습니다.')
      } else {
        createUser()
      }
    })
    .catch(error => res.send(error))
}

exports.post_login = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then(data => {
      if (data) {
        if (data.password === passwordHash(req.body.password)) {
          req.session.isLogin = true
          req.session.username = data.username
          req.session.userId = data.id
          req.session.save(() => {
            res.send(200, data)
          })
        } else {
          res.send(400, '비밀번호가 일치하지 않습니다')
        }
      } else {
        res.send(400, '회원을 찾을 수 없습니다.')
      }
    })
    .catch(error => {
      res.send(error)
    })
}

