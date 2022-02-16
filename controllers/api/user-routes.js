const router = require('express').Router();
const { User, Recipe, Vote, Comment } = require('../../models');
const error505 = err => {
  console.log(err);
  res.status(500).json(err);
};
const message400 = { message: 'No user found with the the provided information' };

// insomnia test GET /api/users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(error505);
});

// insomnia test GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Recipe,
        attributes: ['id', 'name', 'description', 'ingredients', 'steps', 'user_id'
        // , 'photo' 
      ]
      },
      // Will add if time allows for it
      // {
      //   model: Comment,
      //   attributes: ['id', 'comment_text', 'user_id', 'recipe_id', 'created_at'],
      //   include: {
      //     model: User,
      //     attributes: ['username']
      //   }
      // },
      {
        model: Recipe,
        attributes: ['name'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json(message400);
        return;
      }
      res.json(dbUserData);
    })
    .catch(error505);
});

// insomnia test route POST /api/users
router.post('/', (req, res) => {
    // insomnia testing {"id": "1", "username": "Test-Name", "first_name": "Test", "last_name": "Name", "email": "test-name@testing.com", "password": "Passwprd1234", "allergies": "nuts", "recipe_id": "1"}
    User.create({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      allergies: req.body.allergies,
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
  });

router.post('/login', (req, res) => {
  // testing {"test-name@testing.com", "password": "Passwprd1234"}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json(message400);
      return;
    }
    // verify user
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});


// insomnia test route PUT /api/users/1
router.put('/:id', (req, res) => {
  // insomnia testing {"last_name": "Names", "allergies": "shellfish, nuts"}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json(message400);
        return;
      }
      res.json(dbUserData);
    })
    .catch(error505);
});

// insomnia test DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json(message400);
        return;
      }
      res.json(dbUserData);
    })
    .catch(error505);
});

// testing with POST /logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;