const models = require('../../models')
exports.post_join = (req, res) => {
  // res.send(req.body)
  models.User.create(req.body).then(() => {
    res.send(200, req.body)
  })
}
