var Fetch = require('whatwg-fetch');
var baseUrl = "http://pokeapi.co/";

var HTTP = {
  get: function(url){
    return fetch(baseUrl + url)
      .then(function(response) {
        return response.json()
      });
  }
};

module.exports = HTTP;