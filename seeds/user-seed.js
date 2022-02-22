const { User } = require('../models');

const userdata = [
    {
        username: "bootcamp", 
        password: "reallygoodpassword", 
        email: "email@email.com", 
        first_name: "Kellie", 
        last_name: "Harman"
    }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;