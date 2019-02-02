const html = require('choo/html')

module.exports = showAddresses

function showAddresses(state) {

  return html`<P>${(new Date()).toLocaleTimeString()}<br>${state.myaddress.bookName} - ${state.myaddress.address}</P>`

  //return html`<P>${Object.entries(state.myaddress).forEach(([key, value]) => {
    //return `${key} - ${value}`})}</P>`
  
}