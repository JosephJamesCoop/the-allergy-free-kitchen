const router = require('express').Router();
const { User } = require('../../../models');

// insomnia test DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with the the provided information' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;