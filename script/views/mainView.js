const html = require('choo/html')

module.exports = mainView 

function mainView (state, emit) {
  
  return html`
    <body>
      <form id="createAddressBeamForm" onsubmit=${onsubmit}>
      <h3>Address Book Name</h3>
        <input 
          type="text"
          placeholder="Home, Office, Cottage, etc" 
          id="bookName" 
          name="bookName" 
          required="required" 
          title="Username must be between 1 and 36 characters long." 
          pattern=".{1,63}" 
          autofocus="autofocus">
          <h3>Enter your Address</h3>
          <P>
          <input 
            id="address" 
            name="address" 
            placeholder="Save your address here" 
            type="text" 
            autofocus="autofocus" 
            pattern=".{1,63}" 
            required="required">
          </p>
          <input type="submit" value="Submit" class="_2abd6af1">
        </form>
        ${showAddresses()}
    </body>
  `

  function onsubmit (e) {
    e.preventDefault()                                              
    var form = e.currentTarget                                        
    var formData = new FormData(form)
    state.formData = formData
    emit('serverSync') //trigger the mainStore using this emitter
  }

  function showAddresses() {
    return html`${(new Date()).toLocaleTimeString()}<br>${state.myaddress.bookName} - ${state.myaddress.address}`
  }  
  
}
