// this js file is mini app for the similar routes that has to be performed.

const express = require('express');
const blogController = require('../controllers/blogController')
const router = express.Router();


// blog routes ,,,, fetching data from the database.
router.get('/', blogController.blog_index);

// creating new blog.
router.get('/create', blogController.blog_create_get);

// posting the new blog to the database.
router.post('/',blogController.blog_create_post);
 
// displaying the blog using id.
router.get('/:id', blogController.blog_details);

// deleting the blog
router.delete('/:id', blogController.blog_delete);
 

  module.exports = router;