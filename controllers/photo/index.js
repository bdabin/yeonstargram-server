const { Router } = require('express');
const router = Router();
const ctrl = require('./photo.ctrl');
const upload = require('../../middleware/multer');

router.post('/', upload.single('url') ,ctrl.upload_image);

module.exports = router;

