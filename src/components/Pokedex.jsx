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
      this.setState({pokemonList: data});
      console.log("Received data:", data);
    }.bind(this));
  },
  render: function(){
    if (this.state.pokemonList){
      var displayPokemon = this.state.pokemonList.pokemon.slice(5,10).map(function(pokemon){
        return <Pokemon key={pokemon.name} url={pokemon.resource_uri} />;
      });
    }

    return (
      <div className="container">
        <ul>{displayPokemon}</ul>
      </div>
    );
  }
});

module.exports = Pokedex;