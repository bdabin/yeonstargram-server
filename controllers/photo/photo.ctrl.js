const models = require('../../models')

exports.upload_image = async (req, res) => {
  try {
    const url = await (req.file) ? req.file.path : "";
    const filter = req.body.filter ? req.body.filter : 'normal'

    const response = await models.Photo.create({
      url,
      filter
    });

    res.json(response)

  } catch (e) {
    res.send(e);
  }
}