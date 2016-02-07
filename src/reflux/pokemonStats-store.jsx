var HTTP = require('../services/http.js');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var PokemonStatsStore = Reflux.createStore({
  listenables: [Actions],

  getPokemonStats: function(url){
    HTTP.get('/' + url)
    .then(function(data) {
      this.trigger(data);
    }.bind(this));
  },

});

module.exports = PokemonStatsStore;