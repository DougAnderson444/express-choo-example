const html = require('choo/html')

module.exports = function (state, emitter) {
  state.domtext = 'Initial Dom Loaded '
  //DOMContentLoaded only runs once, not when render is emitted
  emitter.on('serverSync', function (){
    //take the browser state and POST it to the server
    const body = state.formData
    const formValues = objectFromFormData(state.formData)
    //console.log(formValues.bookName+' '+formValues.address)
    fetch('/api', { method: 'POST', body })
      .then(res => {
        if (!res.ok) return console.log('oh no!')
          res.json().then(function(data) {
            // do something with your data
            //console.log(JSON.stringify(data, null, 2))
            console.log('Pre-update: '+JSON.stringify(state.myaddress, null, 2))
            Object.entries(data).forEach(([key, value]) => {
              //console.log(`key ${key} value ${value}`)
              state.myaddress[key] = value
              //console.log('In update: '+JSON.stringify(state.addresses, null, 2))
            })
            console.log('Post update: '+JSON.stringify(state.myaddress, null, 2))
            emitter.emit('render')
          });
      })
      .catch(err => console.log('oh no catch!'))
    })
  
    emitter.on('DOMContentLoaded', function (){
    //do something to the state upon the DOM being loaded
    state.domtext = `Dom loaded ${(new Date()).toLocaleTimeString()}`
    })
}

function objectFromFormData(formData) {
  var values = {};
  for (var pair of formData.entries()) {
    var key = pair[0];
    var value = pair[1];
    if (values[key]) {
      if ( ! (values[key] instanceof Array) ) {
        values[key] = new Array(values[key]);
      }
      values[key].push(value);
    } else {
      values[key] = value;
    }
  }
  return values;
}