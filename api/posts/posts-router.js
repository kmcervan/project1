const express = require('express');

const Posts = require('../posts/posts-model');
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  });
});

router.get('/:id', mw.validatePostId, (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  res.status(200).json(req.post)
});

// do not forget to export the router
module.exports = router;