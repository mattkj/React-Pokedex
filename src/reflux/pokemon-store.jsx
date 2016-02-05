var HTTP = require('../services/http.js');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var PokemonStore = Reflux.createStore({
  listenables: [Actions],

  getInitialState: function() {
    return {pokemonList: null, pokemonStats: null};
  },

  getPokemonList: function(){
    HTTP.get('/api/v1/pokedex/1/')
    .then(function(data) {
      this.pokemonList = data;
      this.trigger(this.pokemonList);
    }.bind(this));
  },

  getPokemonStats: function(url){
    console.log(url);
    // HTTP.get('/' + url)
    // .then(function(data2) {
    //   this.pokemonStats = data2;
    //   this.trigger(this.pokemonStats);
    // }.bind(this));
  },

  getPokemonImage: function(){

  }
});

module.exports = PokemonStore;