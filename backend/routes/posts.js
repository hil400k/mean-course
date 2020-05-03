const express = require('express');
const checkAuth = require('../middlware/check-auth');
const extractFile = require('../middlware/file');
const PostsController = require("../controllers/posts");
const router = express.Router();

router.post("", checkAuth, extractFile, PostsController.createPost)
router.get("/:id", PostsController.getPost);
router.put("/:id", checkAuth, extractFile, PostsController.updatePost);
router.get("", PostsController.getPosts);
router.delete("/:id", checkAuth, PostsController.deletePost);

module.exports = router;
