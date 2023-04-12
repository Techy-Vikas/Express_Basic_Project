const express  = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

// router.get('/post',postController.post)
router.post('/create',passport.checkAuthentication,commentsController.create);

module.exports = router;