const { Router } = require('express');
const router = Router();

const ctrl = require('./board.ctrl');

router.get('/', ctrl.get_board);
router.post('/write', ctrl.post_board);
router.post('/write/:id', ctrl.post_edit);
router.get('/write/:id', ctrl.get_edit);
router.get('/delete/:id', ctrl.get_delete);
router.post('/like', ctrl.post_like);
router.delete('/like', ctrl.delete_like);

router.get('/comment/:id', ctrl.get_comment);
router.post('/comment/:id', ctrl.post_comment);
module.exports = router;

