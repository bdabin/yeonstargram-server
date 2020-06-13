const models = require('../../models')

// 로그인 조회
exports.get_is_login = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user.dataValues)
  } else {
    res.status(404).send('로그인 중이 아닙니다')
  }
}

// 회원가입
exports.post_join = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).send('입력을 제대로 하지 않았습니다.')
    return
  }

  // 유저 생성 함수 (아래에서 호출)
  const createUser = () => {
    models.User.create(req.body).then(() => {
      res.status(200).send('회원가입 완료 !')
    })
  }

  models.User.findOne({ where: { email: req.body.email } })
    .then(data => {
      if (data) {
        res.status(400).send('이미 가입된 이메일이 있습니다.')
      } else {
        createUser()
      }
    })
    .catch(error => res.send(error))
}

// 로그인
exports.post_login = (req, res) => {
  if (req.user) {
    res.status(200).send('로그인 성공')
  } else {
    res.status(404).send('BAD REQUEST')
  }
}

// 로그아웃
exports.post_logout = (req, res) => {
  req.logout()
  req.session.save(() => {
    res.status(200).send('로그아웃 완료 ')
  })
}

// exports.post_mypage = async (req, res) => {
//   try {
//     console.log(req.file);

//     req.body.url = await (req.file) ? req.file.path : "";

//     models.Photo.create(req.body);

//   } catch (e) {
//     console.log(e);

//   }
// }

exports.get_mypage = async (req, res) => {
  try {
    const data = await models.User.findOne(
      {
        where: { id: req.params.id },
        include: [
          {
            model: models.Board,
            as: 'BoardList',
            foreignKey: 'writer'
          },
          {
            model: models.User,
            as: 'Follower',
            otherKey: 'to',
            attributes: { exclude: ['to'] }
          },
          {
            model: models.User,
            as: 'Following',
            otherKey: 'from',
            attributes: { exclude: ['to'] }
          },

        ]
      }
    )
    res.json(data);
  } catch (e) {
    console.log(e);
  }
}

//팔로잉 
exports.post_follow = async (req, res) => {
  try {
    const from = await models.User.findByPk(req.body.from)
    const to = await models.User.findByPk(req.body.to)
    const status = to.addFollower(from)

    res.json({
      status
    })

  } catch (e) {
    res.status(400).send(e)
    console.log(e);
  }
}


exports.delete_follow = async (req, res) => {
  try {
    const from = await models.User.findByPk(req.body.from)
    const to = await models.User.findByPk(req.body.to)

    const status = to.removeFollower(from)
    res.json(status)
  } catch (e) {
    console.log(e);

  }
}