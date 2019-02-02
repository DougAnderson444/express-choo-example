//main.js
var choo = require('choo')
var html = require('choo/html')
var mods = require("./module");
var stateAddresses = require('./showAddys')
var initState = require('./stores/initState')
var mainStore = require('./stores/mainStore')

var app = choo()

app.use(initState)
app.use(mainStore)
app.route('/', testForm) //for POST tests
//app.route('/', mainF) //for counter
app.mount('body')
 
function mainF (state, emit ) {

  
  function reqListener(data){
    document.body.innerHTML += ` <br>${this.responseText} ${state.domtext}`
  }

  const h = html`<body>${state.domtext}</body>`

  setInterval(function () {
    var oReq = new XMLHttpRequest()
    oReq.addEventListener("load", reqListener)
    oReq.open("GET", "/api")
    oReq.send()
    //emit('reload')
    //emit('render')
  },1200)

  return h

}

function testForm (state, emit) {
  return html`
    <body>
      <form id="createAddressBeamForm" onsubmit=${onsubmit}>
      <h3>Name yourAddress Book</h3>
        <input 
          type="text"
          placeholder="added addressName" 
          id="bookName" 
          name="bookName" 
          required="required" 
          title="Username must be between 1 and 36 characters long." 
          pattern=".{1,63}" 
          autofocus="autofocus">
          <p>
          <h3>
          Enter your Address</h3>
          <p>
          <input 
            id="address" 
            name="address" 
            placeholder="Your address goes here" 
            type="text" 
            autofocus="autofocus" 
            pattern=".{1,63}" 
            required="required">
            </p><p>
          <input type="submit" value="Submit" class="_2abd6af1">
          </p></p>
        </form>
        <br>Addresses Submitted to the Server: ${stateAddresses(state)} <br />
    </body>
  `

  function onsubmit (e) {
    e.preventDefault()                                              
    var form = e.currentTarget                                        
    var formData = new FormData(form)


    state.formData = formData
    emit('serverSync')
    
    /*
    //moved to sync handler
    fetch('/api', { method: 'POST', body })
      .then(res => {
        if (!res.ok) return alert('oh no!')
        //alert('POST request ok ')
        document.body.innerHTML += JSON.stringify(res) + '...! <br>'
      })
      .catch(err => alert('oh no catch!'))
    */
  }
}

