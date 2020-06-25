const models = require('../../models')

exports.get_boards = (req, res) => {
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
        },
        {
          association: 'hashtag',
          attributes:['id','name']
        },
        {
          model:models.Photo,
          foreignKey:'photo',
          attributes:['filter','url']
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



exports.get_board = async (req, res) => {
  const response = await models.Board.findOne(
    {
      where: { id: req.params.id },
      include: [{
        association: 'hashtag',
        attributes: ['id', 'name']
      }]
    }
  )

  res.status(200).json(response)
}

exports.post_board = async (req, res) => {
  const description = req.body.description
  const writer = req.body.writer
  let tagData = []

  if (description === '') {
    res.send(404, '내용을 입력해주세요')
    return
  }

  if (req.body.tag) {
    const tags = req.body.tag.split(' ').map(tag => {
      return new Promise((resolve, reject) => {
        resolve(models.Tag.create({ 'name': tag }))
      })
    })
    const response = await Promise.all(tags)
    tagData = response.map(data => {
      return data.dataValues.id
    })
  }

  const data = await models.Board.create({ writer,  description, photo: req.body.photo})

  const result = tagData.map(async tag => {
    await data.addHashtag(tag)
  })
  
  res.send(200, result)
}


exports.put_board = async (req, res) => {

  // 게시글 수정
  const board = await models.Board.findByPk(req.params.id)
  await board.update({ description: req.body.description })

  // 새로 입력한 태그 생성&연결
  const newTags = req.body.addTags
  if (newTags.length > 0) {
    newTags.map(async tag => {
      await models.Tag.findOrCreate({ where: { 'name': tag } })
        .then(async data => {
          await board.addHashtag(data[0].id)
        })
    })
  }

  // 삭제된 태그 연결 해제
  const removeTags = req.body.removeTags
  if (removeTags.length > 0) {
    removeTags.map(async tag => {
      await models.Tag.findOne({ where: { 'name': tag } })
        .then(async data => {
          await board.removeHashtag(data)
        })
    })
  }

  res.send(200)
}

exports.del_board = (req, res) => {
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

// exports.get_comment = async (req, res) => {
//   try {

//     const data = await models.Board.findOne(
//       {
//         where: {
//           id: req.params.id
//         },
//         include: [
//           {
//             model: models.Reply,
//             as: 'Reply',
//             attributes: { exclude: ['writer'] },
//             include: [
//               {
//                 model: models.User,
//                 as: 'User',
//                 attributes: ['username'],
//               }
//             ]
//           },
//         ]
//       });
//     // res.send(200, Board);
//     res.status(200).json(data)
//   } catch (e) {
//     console.log(e);
//   }
// }
exports.get_comment = async (req, res) => {
  try {

    const data = await models.Reply.findAll(
      {
        where: {
          board_id: req.params.id
        },
        include: {
          association: 'User',
          attributes: ['username']
        }
      });
    // res.send(200, Board);
    res.status(200).json(data)
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
