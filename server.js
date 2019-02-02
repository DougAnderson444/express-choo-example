var express = require('express'); //Nodejs server framework
var browserify = require('browserify-middleware'); //to package up node re
const formidableMiddleware = require('express-formidable'); //to process forms easy

var app = express();

//provide browserified versions of all the files in the script directory
app.use('/js', browserify(__dirname + '/script'));
app.use(express.static(__dirname + '/public'));
app.use(formidableMiddleware()); //process form data first with this middleware

app.all('/api', function(req,res){
  console.log('Form Fields: '+JSON.stringify(req.fields) + ' on api '+req.method+' hit successfully')
  //Object.keys(req.fields).forEach(e => console.log(`key=${e}, value=${req.fields[e]}`))
  Object.entries(req.fields).forEach(([key, value]) => {
    console.log(`Object Entry: ${key}: ${value}`)
  
  })
  //save data to fs 
  //Dat.joinNetwork or 
  
  //or
  
  // Save to hyperdrive)
  // hyperdrive.replicate
  
  //Server response
  res.setHeader('Content-Type', 'application/json');
  //res.send(JSON.stringify(req.fields))
  res.json((req.fields)) 
  
  //JSON.stringify(req.fields, null, 2)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {console.log('Your app is listening on port ' + listener.address().port)})