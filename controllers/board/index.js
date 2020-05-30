const { Router } = require('express');
const router = Router();

const ctrl = require('./board.ctrl');

router.get('/board', ctrl.get_board);

module.exports = router;

