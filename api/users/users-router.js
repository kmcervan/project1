const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const mw = require('../middleware/middleware');

const router = express.Router();


router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  });
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.users)
});

router.post('/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user'
    });
  });
});

router.put('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  });
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(count => {
    res.status(200).json({ message: 'The user has been deleted'});
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  });
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error getting the posts for this user',
    });
  });
});

router.post('/:id/posts',mw.validateUserId, mw.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id};

  Posts.insert(postInfo)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding post for the user',
    });
  });
});

// do not forget to export the router
module.exports = router;
