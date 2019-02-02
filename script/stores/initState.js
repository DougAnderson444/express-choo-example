const html = require('choo/html')

module.exports = function (state) {
  // use these initial state values
  const bookName = "First Address"
  const address = "Ottawa"
  state.myaddress = {bookName, address}
}