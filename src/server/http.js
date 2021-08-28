const express = require('express');
const routes = require('../routes/routes');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// JSON body parser middleware
app.use(bodyParser.json()).get(function(req ,res, next){
next();
});

//Cross-Origin Resource Sharing Middleware
app.use(cors()).get(function(req ,res, next){
next();
});

//Routing Middleware
app.use('/' , routes);

//Exporting Express Application
module.exports = app;