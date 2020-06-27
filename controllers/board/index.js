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
router.get('/:id/comment', ctrl.get_comment);
router.post('/:id/comment', ctrl.post_comment);

router.get('/explore',ctrl.get_search)

module.exports = router;

