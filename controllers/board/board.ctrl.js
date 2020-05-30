const models = require('../../models')

exports.get_board = async (req, res) => {
  const Board = await models.Board.findAll({})
  res.send(Board);

}


exports.post_board = (req, res) => {

  if(req.body.title === '' || req.body.description === '') {
    res.send(404,'내용을 입력해주세요')
    return 
  }

  models.Board.create({
    ...req.body,
  }).then(data => {
    res.send(200, data)
  })
}