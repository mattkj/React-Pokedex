var HTTP = require('../services/http.js');
var Reflux = require('reflux');
var Actions = require('./Actions.js');

var PokemonStore = Reflux.createStore({
  listenables: [Actions],

  getPokemonList: function(){
  	console.log('STORE GOT CALLED');
    HTTP.get('/api/v1/pokedex/1/')
    .then(function(data) {
      this.trigger(data);
    }.bind(this));
  },

});

module.exports = PokemonStore;