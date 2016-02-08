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
      console.log("data:", data);
      this.setState({pokemonList: data});
    }.bind(this));
  },
  filterPokemon(filterBy){
    var newList = this.state.pokemonList.pokemon.slice(0,24).filter(function(pokemon){
      return pokemon.name <= filterBy;
    });
    console.log("filtered list:", newList);
  },
  render: function(){
    if (this.state.pokemonList){
      console.log("original list:", this.state.pokemonList.pokemon.slice(0,24));

      var displayPokemon = this.state.pokemonList.pokemon.slice(0,24).map(function(pokemon){
        return <Pokemon key={pokemon.name} url={pokemon.resource_uri} />;
      });

      this.filterPokemon("c");
    }

    return (
      <div className="wrapper">{displayPokemon}</div>
    );
  }
});

module.exports = Pokedex;