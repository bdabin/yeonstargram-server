const { Router } = require('express');
const router = Router();

const ctrl = require('./board.ctrl');

router.get('/', ctrl.get_board);
router.post('/write', ctrl.post_board);
router.post('/write/:id', ctrl.post_edit);
router.get('/write/:id', ctrl.get_edit);
router.get('/delete/:id', ctrl.get_delete);

module.exports = router;

