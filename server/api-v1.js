const fs = require('fs')  //Nodejs FIleSystem
//const fsPromises = require('fs').promises; //Experiemntal Filesys with promises
var Dat = require('dat-node') //add Dat from server side
var util = require('util'); //for promises

// __dirname app/server
var prefix = __dirname + '/myaddress/'
var fileName = 'myaddress.json'

module.exports = function(req,res){
  console.log('Form Fields: '+JSON.stringify(req.fields) + ' on api '+req.method+' hit successfully')
  //Object.keys(req.fields).forEach(e => console.log(`key=${e}, value=${req.fields[e]}`))
  Object.entries(req.fields).forEach(([key, value]) => {
    //console.log(`Object Entry: ${key}: ${value}`)
  })

  let data = JSON.stringify(req.fields, null, 2)
  
  // Make the dir if it doesn't exist
  try {
    if (!fs.existsSync(prefix)){
      fs.mkdirSync(prefix, error => {console.log(error)}) 
    }
  } catch (err) {
    console.error(err)
  }  
  
  const writeFile = util.promisify(fs.writeFile);
  writeFile(prefix+fileName, data, {flag: 'w'})
    .then(() => {
      console.log(`file ${prefix+fileName} created successfully with promisify!`)
      processDat()
    })
    .catch(error => console.log(error));
  
  //Dat code 
  function processDat(){
    
    Dat(prefix, function (err, dat) {
      if (err) throw err
      dat.importFiles()
      dat.joinNetwork()
      console.log('My Dat address link is: dat://', dat.key.toString('hex'))
      writeDatJson (dat.key.toString('hex'), fileName)
    })

    //save the dat.json metafile too
    function writeDatJson (keyHex,docName) {
      const json = JSON.stringify({
        url: `dat://${keyHex}/`,
        title: docName,
        description: `BeamDat demo`
      }, null, 2)

      fs.writeFile(prefix+'dat.json', json, err => {
        if (err) throw err
      })
    }
    //end
  }
    
  //Server response
  console.log('Sending response: '+JSON.stringify(req.fields))
  res.setHeader('Content-Type', 'application/json');
  //res.send(JSON.stringify(req.fields))
  res.json(req.fields) 
  
  //JSON.stringify(req.fields, null, 2)
}