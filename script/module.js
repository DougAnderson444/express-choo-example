module.exports = {
  addtwo,
  objectFromFormData
}

  function addtwo(a, b){
    return a + b;
  };
    
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