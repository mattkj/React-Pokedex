var HTTP = require('../services/http.js');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var PokemonListStore = Reflux.createStore({
  listenables: [Actions],

  getPokemonList: function(){
    HTTP.get('/api/v1/pokedex/1/')
    .then(function(data) {
      this.trigger(data);
    }.bind(this));
  },

});

module.exports = PokemonListStore;