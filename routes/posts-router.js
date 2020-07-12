const express = require('express')
const router = express.Router();

const db = require("../data/db.js")

//Create Operations
router.post('/', (req, res) => { // posts
  let post = req.body;
  if (post.title && post.contents){
    db.insert(req.body)
      .then(id => {
        Object.assign(post, id)
        res.status(201).json(post)
      })
      .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
  }else{
    res.status(400).json( {errorMessage: "Please provide title and contents for the post." })
  }
})

router.post('/:id/comments', (req, res) => { // comments
  const id = req.params.id;
  let comment = req.body;
  Object.assign(comment, {post_id: id})
  try{
    if (comment.text) {
  db.insertComment(comment)
  .then(id => {
    Object.assign(comment, id)
    res.status(201).json(comment)
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  })
}else{
  res.status(400).json({ errorMessage: "Please provide text for the comment." })
}
  }catch{
    res.status(500).json({ error: "There was an error while saving the comment to the database" })
  }
})

// Read Operations
router.get("/", (req, res) => { // ALL posts
  db.find(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Error retreving posts",
    })
  })
})

router.get("/:id", (req, res) => { // posts by id
  db.findById(req.params.id)
  .then(post => {
    console.log(post)
    if (post.length === 1){
      res.status(200).json(post)
    }else {
      res.status(404).json({message: "The post with the specified ID does not exist."})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
})

router.get('/:id/comments', (req, res) => { // comments by post id
  const {id} = req.params;
  try{
    db.findPostComments(id)
    .then(comment => {
      res.status(200).json(comment)
    })
    .catch(err => {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
  }
  catch{
    res.status(500).json({ error: "The comments information could not be retrieved." })
  }
})

// delete operations
router.delete('/:id', (req, res) => { // delete post by id
  const {id} = req.params;
  let post
  db.findById(id)
  .then(e => {
    post = e
  })
  .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))
  db.remove(id)
    .then(e => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: "The post could not be removed" }))

})

//Update operations
router.put("/:id", (req, res) => {
  const newPost = req.body;
  const {id} = req.params;
  
  if (newPost.title && newPost.contents) {
      db.update(id, newPost)
      .then(success => {
          if (success !== 1) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
          }else{
            res.status(200).json(newPost)
          }
        
      })
      .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
    
  }else{
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
    
    

})


module.exports = router