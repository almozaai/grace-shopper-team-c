const express = require('express');
const app = express();
const db = require('./db')
const path = require('path');

app.use(require('express-session')({
  secret: process.env.SECRET
}));

const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//GET Route
app.get('/api/users', (req, res, next)=>{
  db.models.User.findAll()
    .then(user => res.send(user))
    .catch(next)
})
app.get('/api/products', (req, res, next)=> {
  db.models.Product.findAll()
    .then(product => res.send(product))
    .catch(next)
})

// Create a user
app.post('/api/users', (req, res, next)=>{
  db.models.User.create(req.body)
    .then(user => res.send(user))
    .catch(next)
})


db.syncAndSeed()
  .then(()=> {
    app.listen(port, console.log(`you are listening on port ${port}`))
  })
