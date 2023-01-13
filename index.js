//import express and morgan
const express = require('express'), morgan = require('morgan'), uuid = require('uuid'), bodyParser = require('body-parser');
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

let topMovies = [
  {
    title: 'M3GAN',
    description: 'A robotics engineer at a toy company builds a life-like doll that begins to take on a life of its own.',
    director: {
      name: 'Gerard Johnstone',
      bio: 'a really cool director',
      age: 44,
    },
    genre: {
      name: 'Horror',
      description: 'a film in which very frightening or unnatural things happen, for example dead people coming to life and people being murdered.'
    }
  },
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
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('<h1>Welcome to my App!</h1><br><p>I hope you like it here</p>');
})

//returns a list of all movies
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
})

//returns a list of all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
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
