const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        recipes: [
            {
                name: 'fried chicken',
                icons: ['dairy', 'shellfish']
            }, 
            {
                name: 'shrimp tacos',
                icons: ['soy']
            }
        ]
    })
})

module.exports = router;