const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  // do your magic!
  let URL = req.protocol + '://' + req.get('host') + req.originalUrl
  console.log(`A ${req.method} request was made to ${URL} on ${Date().toLocaleString()}.`);
  next();
}


async function validateUserId(req, res, next) {
  // do your magic!
    console.log('checking hub id')
    res.set('X-Lambda-Header', 'rocks')
    try {
      const users = await Users.getById(req.params.id)
      if (users) {
        req.users = users
        next()
      } else {
        res.status(404).json(`user with id ${req.params.id} not found`)
      }
    }catch(error){
      res.status(500).json('ouch')
    }
  }

function validateUser(req, res, next) {
  // do your magic!
  // check that req body has correct shape
  //if req.body legit, proceed
  //otherwise send back a 400 error
  const { name } = req.body;
  if (name) {
    next();
  } else if(name === '') {
    res.status(400).json({ message: 'missing required name field'})
  } else {
    res.status(400).json({ message: 'missing user data'})
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const { text } = req.body;
  if (text) {
    next();
  } else if(text === '') {
    res.status(400).json({ message: 'missing required text field'})
  } else {
    res.status(400).json({ message: 'missing post data'})
  } 
}

async function validatePostId(req, res, next){
  try {
    const post = await Posts.getById(req.params.id)
    if (post) {
      req.posts = post
      next()
    } else {
      res.status(404).json(`post with id ${req.params.id} not found`)
    }
  }catch(error){
    res.status(500).json('ouch')
  }
}


// do not forget to expose these functions to other modules
module.exports = {
  validateUserId,
  validateUser,
  validatePost,
  validatePostId,
  logger
}
