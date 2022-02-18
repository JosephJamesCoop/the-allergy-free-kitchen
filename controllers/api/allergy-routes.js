const router = require('express').Router();
const { Recipe, User, Vote, DownVote, Comment } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        console.log('=============================');
        const allergyData = await Allergy.findAll({
            attributes: [
                'id',
                'name',
                'description',
                'ingredients'
            ],
            include: [
                {
                    model: Recipe,
                    attributes: ['id', 'name', 'ingredients'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        res.json(allergyData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;