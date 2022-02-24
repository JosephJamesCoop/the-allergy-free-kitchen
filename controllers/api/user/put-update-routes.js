const router = require('express').Router();
const { User, Recipe, Vote } = require('../../../models');
const error505 = err => {
  console.log(err);
  res.status(500).json(err);
};
const message400 = { message: 'No user found with the the provided information' };



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

module.exports = router;