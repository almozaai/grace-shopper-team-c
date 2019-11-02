const express = require('express');
const app = express();
const db = require('./db')
const { User, Product } = db.models;
const path = require('path');

app.use(require('express-session')({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
}));

const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//GET Route
app.get('/api/users', (req, res, next)=>{
  User.findAll()
    .then(user => res.send(user))
    .catch(next)
})
app.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then(product => res.send(product))
    .catch(next)
})

// Create a user
app.post('/api/users', (req, res, next)=>{
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next)
})

// Login
app.post('/api/login', (req, res ,next) => {
  User.findOne({ where: {
    email: req.body.email,
    password: req.body.password
  }})
  .then( user => {
    if(!user) {
      throw({ status: 401 })
    }
    //console.log('user: ', user);
    req.session.user = user;
    return res.send(user);
  })
  .catch(err => next(err));
})

app.get('/api/session', (req, res, next) => {
  const user = req.session.user
  if(user) {
    return res.send(user)
  }
  next({ status: 401 })
})

app.delete('/api/logout', (req, res, next) => {
  req.session.destroy()
  res.sendStatus(204);
})


db.syncAndSeed()
  .then(()=> {
    app.listen(port, console.log(`you are listening on port ${port}`))
  })
