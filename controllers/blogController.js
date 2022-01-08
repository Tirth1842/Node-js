const Blog = require('../models/blog');



const blog_index = (req,res) => {
    Blog.find().sort({ createdAt: -1})
     .then((result) => {
       res.render('blogs/index',{title: 'All Blogs', blog: result}) //passing the array of object to index.ejs
     })
     .catch((err) => {
       console.log(err)
     })
}

const blog_details = (req,res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
      .then((result) => {
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
      })
      .catch((err) => {
        res.render('404', { title: 'Blog not found' });
      })
}

const blog_create_get = (req,res) => {
    res.render('blogs/create',{ title:'Create a new blog'} );
}

const blog_create_post = (req,res) => {
    const blog = new Blog(req.body);
 
    blog.save()
      .then((result) => {
        res.redirect('/blogs');
      })
      .catch((err) => {
        console.log(err);
      })
}

const blog_delete = (req,res) => {
   const id = req.params.id; 

   Blog.findByIdAndDelete(id)
   .then(result => {
     res.json({ redirect: '/blogs' }) // as we are getting the req from ajax i.e from frontend 
   })                                 // we cannot redirect the page. so we are sending the json as an response and that we will process at frontend level.
   .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}