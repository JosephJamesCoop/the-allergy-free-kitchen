const router = require('express').Router();
const { Recipe } = require('../../../models');


router.delete('/:id', (req, res) => {
  Recipe.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No Recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;