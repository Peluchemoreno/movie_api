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
  {
    title: 'Dragon Ball Z: Battle of Gods',
    description: 'The Z-Fighters must contend with Lord Beerus, the God of Destruction, but only a God can fight a God, and none of them are Gods. However with the creation of the Super Saiyan God, will the Z-Fighters be able to defeat Lord Beerus?',
    director: {
      name: 'Masahiro Hosoda',
      bio: 'a really cool director',
      age: 44,
    },
    genre: {
      name: 'Animation',
      description: 'Animated Films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame (stop-frame cinematography).'
    }
  },
  {
    title: 'Inside Out',
    description: 'After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.',
    director: {
      name: 'Pete Docter',
      bio: 'a really cool director',
      age: 44,
    },
    genre: {
      name: 'Animation',
      description: 'Animated Films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame (stop-frame cinematography).'
    }
  },
  {
    title: 'Jurassic Park',
    description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    director: {
      name: 'Steven Spielberg',
      bio: 'a really cool director',
      age: 44,
    },
    genre: {
      name: 'Sci-Fi',
      description: 'a form of fiction that deals principally with the impact of actual or imagined science upon society or individuals'
    }
  },
  {
    title: 'Shutter Island',
    description: 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
    director: {
      name: 'Martin Scorsese',
      bio: 'a really cool director',
      age: 44,
    },
    genre: {
      name: 'Mystery',
      description: 'The mystery genre is a genre of fiction that follows a crime (like a murder or a disappearance) from the moment it is committed to the moment it is solved.'
    }
  },
  {
    title: 'Toy Story',
    description: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
    director: {
      name: 'John Lasseter',
      bio: 'a really cool director',
      age: 74,
    },
    genre: {
      name: 'Animation',
      description: 'Animated Films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame (stop-frame cinematography).'
    }
  },
  {
    title: 'Django Unchained',
    description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'a really cool director',
      age: 44,
    },
    genre: {
      name: 'Drama',
      description: 'drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    }
  },
  {
    title: 'Spirited Away',
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    director: {
      name: 'Hayao Miyazaki',
      bio: 'a really cool director',
      age: 50,
    },
    genre: {
      name: 'Animation',
      description: 'Animated Films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame (stop-frame cinematography).'
    }
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    director: {
      name: 'Christopher Nolan',
      bio: 'a really cool director',
      age: 40,
    },
    genre: {
      name: 'Sci-Fi',
      description: 'a form of fiction that deals principally with the impact of actual or imagined science upon society or individuals'
    }
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    director: {
      name: 'Frank Darabont',
      bio: 'a really cool director',
      age: 50,
    },
    genre: {
      name: 'Drama',
      description: 'drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    }
  },

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
  let genre = topMovies.find(x => {
    return x.genre.name === genreName;
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
  let movie = topMovies.find(x => {
    return x.title === title;
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

  let user = users.find(x => {
    return x.id == id;
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

  let user = users.find(x => {
    return x.id == id;
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

  let user = users.find(x => {
    return x.id == id;
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

  let user = users.find(x => {
    return x.id == id;
  });

  if (user) {
    users = users.filter(x => x.id != id);
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
