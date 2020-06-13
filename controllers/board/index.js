const { Router } = require('express');
const router = Router();
const ctrl = require('./board.ctrl');

router.get('/', ctrl.get_boards);

// 게시글 CRUD
router.get('/write/:id', ctrl.get_board);
router.post('/write', ctrl.post_board);
router.put('/write/:id', ctrl.put_board);
router.delete('/delete/:id', ctrl.del_board);

// 좋아요
router.post('/like', ctrl.post_like);
router.delete('/like', ctrl.delete_like);

// 댓글
router.get('/comment/:id', ctrl.get_comment);
router.post('/comment/:id', ctrl.post_comment);

module.exports = router;

