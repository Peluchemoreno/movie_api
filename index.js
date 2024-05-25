//import express and morgan
const express = require('express'), morgan = require('morgan'), uuid = require('uuid'), bodyParser = require('body-parser');
const Movie = require('./movie')
const User = require('./user')
const app = express();


let users = [
  {
    id: 1,
    name: 'user1',
    favoriteMovies: ["megan"
    ]
  },
  {
    id: 2,
    name: 'User2',
    favoriteMovies: [

    ]
  }
]

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next()
})

//middleware functions
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('<h1>Welcome to my App!</h1><br><p>I hope you like it here</p>');
})

//returns a list of all movies
app.get('/movies', (req, res) => {
  Movie.find({}).then(data => {
    res.send(data)
  })
})

//add a Single Movie
app.post('/movies', (req, res)=>{

  const {title, director, rating, genre, image} = req.body

  new Movie({
    title,
    director,
    rating,
    genre,
    image,
  }).save().then(data => {
    res.send(data)
  })
})

// update a movie's image
app.put('/movies/:movieId', (req, res)=>{
  Movie.findOneAndUpdate({
    _id: req.params.movieId
  }, {$set: {image: req.body.image}}).then((data)=>{
      res.send(data)
  })
})

//return a single movie
app.get('/movies/:movieId', (req, res)=>{

  const {id} = req.params
  Movie.find({
    _id: id
  }).then(data => {
    res.send(data)
  })
})

//delete a movie
app.delete('/movies/:movieId' , (req, res)=>{
  Movie.findOneAndDelete({
    _id: req.params.movieId
  }).then(data => {
    res.send(data)
  })
})


//returns a list of all users
app.get('/users', (req, res) => {
  User.find({}).then(data => {
    res.send(data)
  })
})

//returns data about a genre
app.get('/movies/genre/:genreName/', (req, res) => {
  let { genreName } = req.params;
  let genre = topMovies.find(movie => {
    return movie.genre.name === genreName;
  }).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such movie found');
  }
})

//return data about a single movie
app.get('/movies/:title', (req, res) => {
  let { title } = req.params;
  let movie = topMovies.find(movie => {
    return movie.title === title;
  });

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie found');
  }
})

//return data about a movie's director
app.get('/movies/:title/director', (req, res) => {
  let title = req.params.title;
  let director = topMovies.find(x => {
    return x.title === title;
  }).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no director found');
  }
}
)

//allows new users to register
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('User needs a name')
  }
})

//allows users to update their username
app.put('/users/:id', (req, res) => {
  const id = req.params.id;

  const updatedUserName = req.body.name;

  let user = users.find(user => {
    return user.id == id;
  })

  if (user) {
    user.name = updatedUserName;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user');
  }

})

//allows users to add a movie to their list of favorite movies
app.put('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => {
    return user.id == id;
  });

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`Added ${movieTitle} to list of favorites for user with id:${id}`);
  } else {
    res.status(400).send('cant find this user');
  }
})


//allows users to remove movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => {
    return user.id == id;
  });

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(x => x !== movieTitle);
    res.status(200).send(`Removed ${movieTitle} from list of favorites for user with id:${id}`);
  } else {
    res.status(400).send('cant find this user');
  }
})

//allows user to unregister
app.delete('/users/:id/', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => {
    return user.id == id;
  });

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`Removed user with id:${user.id}`);
  } else {
    res.status(400).send('cant find this user');
  }
})


//error middleware functions always come last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something broke :(');
});

app.listen(8080, () => {
  console.log('app running on port 8080 hehe');
});
