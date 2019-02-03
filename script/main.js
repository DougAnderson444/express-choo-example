//main.js
var choo = require('choo')
var html = require('choo/html')
var mainView = require('./views/mainView')
var initState = require('./stores/initState')
var mainStore = require('./stores/mainStore')

var app = choo()

app.use(initState)
app.use(mainStore)
app.route('/', mainView)
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

