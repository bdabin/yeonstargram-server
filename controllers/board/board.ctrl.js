const models = require('../../models')

exports.get_comment = async (req, res) => {
  try {
    const Board = await models.Board.findOne(
      {
        where: {
          id: req.params.id
        },
        include: [
          'Reply', {
            model: models.User,
            foreignKey: 'writer',
            attributes: { exclude: ["password"] },
          }
        ]
      });
    res.send(200, Board);

  } catch (e) {
    console.log(e);
  }
}

exports.post_comment = async (req, res) => {
  try {
    const Board = await models.Board.findByPk(req.params.id);
    await Board.createReply(req.body)
    res.send(200, Board)
  } catch (e) {
    console.log(e);
  }

}
exports.get_board = (req, res) => {
  models.Board.findAll(
    {
      attributes: { exclude: ['writer'] },
      include: [
        {
          model: models.User,
          foreignKey: 'writer',
          attributes: { exclude: ["password"] },
        },
        {
          association: 'like',
          attributes: [['id', 'user_id'], 'username'],
        }
      ]
    }
  )
    .then(data => {
      if (data) {
        res.status(200).json(data)
      }
    })
}


exports.post_board = async (req, res) => {
  const description = req.body.description
  const writer = req.body.writer

  if ( description === '') {
    res.send(404, '내용을 입력해주세요')
    return
  }
  
  let tagData = []

  if(req.body.tag) {
    const tags = req.body.tag.split(' ').map(tag => {
      return new Promise((resolve,reject) => {
        resolve(models.Tag.create({ 'name' : tag }))
      })
    })
    const response = await Promise.all(tags)
    tagData = response.map(data => {
      return data.dataValues.id
    })
  }

  const data = await models.Board.create({
    writer,
    description,
    tag : tagData
  })

  res.send(200, data)
  
}


exports.get_edit = (req, res) => {
  models.Board.findOne(
    {
      where: { id: req.params.id }
    }
  ).then((Board) => {
    res.send(Board);
    console.log(Board);

  });

}

exports.post_edit = (req, res) => {
  models.Board.update(
    {
      title: req.body.title,
      description: req.body.description
    },
    {
      where: { id: req.params.id }
    }
  ).then(() => {
    res.send(200)
  });

}


exports.get_delete = (req, res) => {
  models.Board.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send(200)
  });

}

exports.post_like = async (req, res) => {
  try {
    const board = await models.Board.findByPk(req.body.board_id)
    const user = await models.User.findByPk(req.body.user_id)

    const status = board.addLike(user)
    res.json({
      status
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.delete_like = async (req, res) => {
  try {
    const board = await models.Board.findByPk(req.body.board_id)
    const user = await models.User.findByPk(req.body.user_id)

    const status = board.removeLike(user)
    res.json({
      status
    })
  } catch (err) {
    res.status(400).send(err)
  }
}
