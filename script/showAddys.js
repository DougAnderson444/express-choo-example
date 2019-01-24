const html = require('choo/html')

module.exports = showAddresses

function showAddresses(state) {

  return html`<P>${state.addresses.map(function (obj) {
  return `${obj.addressName} - ${obj.addressValue}`})}</P>`

}