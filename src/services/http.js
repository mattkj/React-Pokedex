var Fetch = require('whatwg-fetch');

var HTTP = {
  get: function(url){
    return fetch(url)
      .then(function(response) {
        return response.json()
      });
  }
};

module.exports = HTTP;