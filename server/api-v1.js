

module.exports = function(req,res){
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
}