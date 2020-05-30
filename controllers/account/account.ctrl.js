const models = require('../../models')
const passwordHash = require('../../helpers/passwordHash');


///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////

exports.post_join = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.send(400, '입력을 제대로 하지 않았습니다.')
    return
  }
  try {
    const createUser = await models.User.create(req.body)

    res.send(200, req.body)

    const data = await models.User.findOne({ where: { email: req.body.email } })

    if (data) {
      res.send(400, '이미 가입된 이메일이 있습니다.')
    } else {
      createUser()
    }
  } catch (e) {
    console.log(e);
  }
}

exports.post_login = async (req, res) => {
  try {

    const data = await models.User.findOne({ where: { email: req.body.email } })

    if (data) {
      if (data.password === passwordHash(req.body.password)) {
        req.session.isLogin = true
        req.session.username = data.username
        req.session.save(() => {
          res.send(200, req.session.username + '님, 로그인 성공');
        })
      } else {
        res.send(400, '비밀번호가 일치하지 않습니다');
      }
    } else {
      res.send(400, '회원을 찾을 수 없습니다.');
    }
  } catch (e) {
    console.log(e);
  }
}

