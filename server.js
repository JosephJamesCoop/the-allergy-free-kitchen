const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3001;

// Defining sequelize storage for all other data besides the browser session
const sequelize = require('./config/connection');

// Defining handlebars instance for use in views
const hbs = exphbs.create({});

// ============================================================================
// === Session created with default storage through sequelize table ===========
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
// ============================================================================
// ============================================================================


// ============================================================================
// === Telling express what to use for its functionality ======================
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`listening at ${PORT}
========================================================`));
});
// =============================================================================