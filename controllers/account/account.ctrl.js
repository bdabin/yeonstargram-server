const models = require('../../models')

exports.post_join = (req, res) => {
  // res.send(req.body)
  models.User.create(req.body).then(() => {
    res.send(200, req.body)
  })
}

exports.post_login = async (req, res) => {
  let data
  try {
    const response = await models.User.findOne({
      where: { email: req.body.email }
    })
    data = response
  } catch (error) {
    data = error.response
    // res.send(error)

  } finally {
    if (data) {
      res.send(200, data)
    } else {
      res.send(404, data)
    }
  }


}

