var express = require('express'); //Nodejs server framework
var browserify = require('browserify-middleware'); //to package up node re
const formidableMiddleware = require('express-formidable'); //to process forms easy
var apiV1 = require('./server/api-v1'); 
var app = express();

//provide browserified versions of all the files in the script directory
app.use('/js', browserify(__dirname + '/script'));
app.use(express.static(__dirname + '/public'));
app.use(formidableMiddleware()); //process form data first with this middleware

app.all('/api/v1', apiV1); //setup API code

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {console.log('Your app is listening on port ' + listener.address().port)})