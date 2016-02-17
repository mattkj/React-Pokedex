var React = require('react');
var HTTP = require('../services/http.js');
var Pokemon = require('./Pokemon.jsx');

var Pokedex = React.createClass({
  getInitialState: function(){
    return {pokemonList: null};
  },
  componentDidMount: function(){
    HTTP.get('/api/v1/pokedex/1/')
    .then(function(data) {
      this.setState({pokemonList: data.pokemon.slice(0, 24)});
      this.state.pokemonList.map(function(pokemon, index){
        this.getPokemonStats(pokemon.resource_uri, index);
      }.bind(this));
    }.bind(this));
  },

  getPokemonStats: function(url, index){
    HTTP.get('/' + url)
    .then(function(data) {
      var pokemon = this.state.pokemonList[index];
      pokemon.stats = data;
      this.forceUpdate();
      this.getPokemonImage(data.sprites[0].resource_uri, index)
    }.bind(this));
  },

  getPokemonImage: function(url, index){
    HTTP.get(url)
    .then(function(data) {
      var pokemon = this.state.pokemonList[index];
      pokemon.stats.image = data;
      this.forceUpdate();
    }.bind(this));
  },

  render: function(){
    if (this.state.pokemonList){
      var displayPokemon = this.state.pokemonList.map(function(pokemon){
        return <Pokemon key={pokemon.name} name={pokemon.name} data={pokemon.stats} />;
      }.bind(this));
    }

    return (
      <div className="wrapper">{displayPokemon}</div>
    );
  }
});

module.exports = Pokedex;