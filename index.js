const express = require ('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { ppid } = require('process');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// Route Generation
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Init MiddleWare
// app.use(logger);

// Handlebars Middlewarea
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Home Page Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//Satic Floder With Pages
app.use(express.static(path.join(__dirname, 'public')));

// Members API Route
app.use('/api/members', require('./route/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));

