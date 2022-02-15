# The Allergy-Free Kitchen
Allergy-based recipe network

  ![](https://img.shields.io/badge/javascript-100-yellow?logo=javascript)
  ![](https://img.shields.io/badge/mysql2-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/sequelize-dep-blue?logo=sequelize)
  ![](https://img.shields.io/badge/dotenv-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/express.js-dep-blue?logo=express)
  ![](https://img.shields.io/badge/bcrypt-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/expressHandlebars-dep-blue?logo=npm)

  ## Description

  This application is deployed to Heroku.

  The Allergy-Free Kitchen is the app for you if you've ever been to a restaurant, taken that first bite and realized you've been poisoned yet again. The app is full of user-created recipes that list real ingredients and allergies together. Peruse around and take in all the smells and flavors.

  The bones of the app are built with mysql for data storage, and sequelize makes up the ligaments that connect data structures together. Express is responsible for all routing and this app can be configured with any front end if you want to fork the repo.

  ## Table of contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Maintainers](#maintainers)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Credits](#credits)
  * [License](#license)

  ## Deployment
  [Heroku Deployment](https://heroku.com)

  ## Installation
  If you are planning on cloning the repository and deploying it yourself, these are the steps necessary:
  Have the latest stable version of node installed: ```node --version```.
  Have mysql installed locally on your system. Check this with ```mysql --version```.

  Clone the repository. Then in your terminal enter ```node install``` which will install all of the dependencies.

  Create a .env file in the root of the repo and paste the following into it with your mysql password:
  ```
    DB_NAME="ecommerce_db"
    DB_USER="root"
    DB_PW="your password here"
  ```

  This file will not be pushed to your repository if you choose to push it.

  ## Usage
  If you will not be using the Heroku deployment and instead wish to deploy yourself:
  First, in your mysql shell enter the following command:
  ```
  source db/schema.sql
  ```
  then quit the sql shell.
  Next, in your terminal enter ```npm start```.

  Now navigate to your browser and the app homepage should be running in the root of localhost.

  ## Maintainers
  [@Heather Albjerg](https://github.com/)
  [@Joseph Cooper](https://github.com/JosephJamesCoop)
  [@Kellie Harman](https://github.com/knharman)
  [@Daniel Harned](https://github.com/DrDano)

  ## Contributing
  Fork the project if you would like to contribute. You can deploy this application with any tool once you have cloned the repo.

  ## Credits
  
  * [mysql2](https://www.npmjs.com/package/mysql2)
  * [sequelize](https://sequelize.org/)
  * [express.js](https://expressjs.com/)

  ## License
  Licensed under [MIT](https://choosealicense.com/licenses/mit) 2022 
  
  ![](https://img.shields.io/badge/license-MIT-blue)