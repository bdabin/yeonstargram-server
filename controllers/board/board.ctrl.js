const models = require('../../models')

exports.get_board = (req, res) => {
  models.Board.findAll(
    { 
      attributes:{ exclude: ['writer']},
      include : [
        {
          model:models.User, 
          foreignKey:'writer',
          attributes: { exclude: ["password"] },
        },
        {
          association:'like',
          attributes:[['id', 'user_id'],'username'],
        }
      ]}
      )
    .then(data => {
      if(data) {
        res.status(200).json(data)
      }
    })
}


exports.post_board = (req, res) => {

  if (req.body.title === '' || req.body.description === '') {
    res.send(404, '내용을 입력해주세요')
    return
  }

  models.Board.create({
    ...req.body,
  }).then(data => {
    res.send(200, data)
  })
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
  } catch(err) {
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
  } catch(err) {
    res.status(400).send(err)
  }
}