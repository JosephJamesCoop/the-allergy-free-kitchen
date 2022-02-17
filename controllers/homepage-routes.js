const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        recipes: [
            {
                name: 'fried chicken',
                icons: ['dairy', 'shellfish'],
                description: 'yum yum delish fried chicken'
            }, 
            {
                name: 'shrimp tacos',
                icons: ['soy'],
                description: 'boy howdy dems are some good shrimp tacos'
            }
        ]
    })
})

module.exports = router;