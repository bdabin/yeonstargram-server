const models = require('../../models');

exports.get_login = (req, res) => {
  res.send('hi')
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

