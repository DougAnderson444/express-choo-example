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

app.mount('body')