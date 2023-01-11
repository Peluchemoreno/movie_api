//import express and morgan
const express = require('express'), morgan = require('morgan'), uuid = require('uuid'), bodyParser = require('body-parser');
const app = express();


let topMovies = [
  { title: 'author0' },
  { title: 'author1' },
  { title: 'author2' },
  { title: 'author3' },
  { title: 'author4' },
  { title: 'author5' },
  { title: 'author6' },
  { title: 'author7' },
  { title: 'author8' },
  { title: 'author9' },
]

//middleware functions
app.use(morgan('common'));
app.use(express.static('public'));


//error middleware functions always come last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something broke :(');
});



app.get('/', (req, res) => {
  res.send('<h1>Welcome to my App!</h1><br><p>I hope you like it here</p>');
})

app.get('/movies', (req, res) => {
  res.json(topMovies);
})

app.get('/supersecretpage', (req, res) => {
  res.send('You found my secret page!');
})

app.listen(8080, () => {
  console.log('app running on port 8080 hehe');
});
