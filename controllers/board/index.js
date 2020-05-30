const { Router } = require('express');
const router = Router();

const ctrl = require('./board.ctrl');

router.get('/', ctrl.get_board);
router.post('/write', ctrl.post_board);

module.exports = router;

