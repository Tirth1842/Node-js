const express = require('express');
const morgan = require('morgan'); // third party middleware
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogroutes'); 
// express app

const app = express();

// connect to mongodb
// this is asyn task so it will take time, after it completes then will call callback function
const dbURI = 'mongodb+srv://tirth:test1234@cluster0.0hmuc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))  // we want server to listen only after the connection with database is successfully done.
  .catch((err) => console.log(err));


// register view engine
app.set('view engine','ejs');
// app.set('view', 'foldername') of the folder name is other than view




// middleware and static files
app.use(express.static('public')); // it is use for accessing the static file like css and image.
app.use(express.urlencoded( { extended: true })); // middleware for encoding the url. 

// middlerware function that note down the details of url.
// middleware are the function that runs between the request and response.
/* app.use((req,res,next) => {
    console.log('new request made:');
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next();
 });*/

app.use(morgan('dev')); // third party middleware.


//  mongoose and mongo sandbox routes
/*app.get('/add-blog', (req,res) => {
   const blog = new Blog({
     title: 'new blog2',
     snippet: 'about my new blog',
     body: 'more about my new blog'
   });

   blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})*/

//  for getting all blogs
/*app.get('/all-blogs',(req,res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})*/

//  for finding single blog
/*app.get('/single-blog',(req,res) => {
  Blog.findById( '61d7fbe82fbdd31dac461aac')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})*/


// routes
app.get('/',(req,res) => {

  res.redirect('/blogs'); // this will redirect to the blog page where all blog will be displayed from the database.

  // hard coded blog.
 /* const blog = [
    {title: 'Yoshi finds eggs', snippet: 'Loerem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Loerem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Loerem ipsum dolor sit amet consectetur'}
  ];

    res.send('<p>home page</p>'); // automatically include header and type of data that has to be send
      res.sendFile('./views/index.html', { root: __dirname }); // setting the relative path
  res.render('index', { title:'home', blog} ); // rendering the index from the view folder */

});



app.get('/about',(req,res) => {

    //res.send('<p>home page</p>'); // automatically include header and type of data that has to be send
      res.render('about',{ title:'About'} );
 });

 // blog routes ,,,, fetching data from the database.
//  app.get('/blogs', (req,res) => {
//    Blog.find().sort({ createdAt: -1})
//     .then((result) => {
//       res.render('index',{title: 'All Blogs', blog: result}) //passing the array of object to index.ejs
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//  })

//  app.get('/blogs/create', (req,res) => {
//    res.render('create',{ title:'Create a new blog'} );
//  })

//  app.post('/blogs',(req,res) => {
//   const blog = new Blog(req.body);

//   blog.save()
//     .then((result) => {
//       res.redirect('/blogs');
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//  })

//  app.get('/blogs/:id', (req,res) => {
//     const id = req.params.id;
//     console.log(id);
//     Blog.findById(id)
//       .then((result) => {
//         res.render('details', { blog: result, title: 'Blog Details' });
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//  })

//  app.delete('/blogs/:id', (req,res)=>{
//   const id = req.params.id;

//   Blog.findByIdAndDelete(id)
//     .then(result => {
//       res.json({ redirect: '/blogs' }) // as we are getting the req from ajax i.e from frontend 
//     })                                 // we cannot redirect the page. so we are sending the json as an response and that we will process at frontend level.
//     .catch(err => console.log(err))
//  })

//all blogs routes are accessed from here.
app.use('/blogs',blogRoutes);

 // redirects
//  app.get('/about-us', (req,res) => {
//      res.redirect('/about');
//  })

 // 404 page
 app.use((req,res) => {
    res.status(404).render('404',{ title:'404'} );

 })