const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//connection
mongoose.connect('mongodb://localhost/crud-mongo', { useNewUrlParser: true })
    .then(db => console.log('mongo connected'))
    .catch(err => console.log(err));

//import routes
const indexRoutes = require('./routes/routes');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

//routes
app.use('/', indexRoutes);

//server start
app.listen(3000, ()=>{
    console.log(`server running at port ${app.get('port')}`);
});