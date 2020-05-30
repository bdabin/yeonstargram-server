const models = require('../../models')

exports.get_board = async (req, res) => {
  const Board = await models.Board.findAll({})
  res.send(Board);

}
