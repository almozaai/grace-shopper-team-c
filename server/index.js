const express = require('express');
const app = express();
const db = require('../db')
const path = require('path');
const routes = require('./routes');
const port = process.env.PORT || 3000;


app.use(require('express-session')({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
}));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/', routes);
app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, '../index.html'));
});



db.syncAndSeed()
  .then(()=> {
    app.listen(port, console.log(`you are listening on port ${port}`))
  })
