var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'getPokemonList',
  'getPokemonStats',
  'getPokemonImage'
]);

module.exports = Actions;