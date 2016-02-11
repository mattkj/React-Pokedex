var React = require('react');
var HTTP = require('../services/http.js');
var Pokemon = require('./Pokemon.jsx');

var Pokedex = React.createClass({
  getInitialState: function(){
    return {pokemonList: null, pokemonStats: null};
  },
  componentDidMount: function(){
    HTTP.get('/api/v1/pokedex/1/')
    .then(function(data) {
      console.log("pokemonList:", data);
      this.setState({pokemonList: data});
    }.bind(this));
  },

  getPokemonStats: function(url){
    HTTP.get('/' + url)
    .then(function(data) {
      this.setState({pokemonStats: data});
      console.log("pokemonStats:", data);
    }.bind(this));
    console.log('getPokemonStats fired');
  },

  // filterPokemon(filterBy){
  //   var newList = this.state.pokemonList.pokemon.slice(0,24).filter(function(pokemon){
  //     return pokemon.name <= filterBy;
  //   });
  //   console.log("filtered list:", newList);
  // },

  render: function(){
    if (this.state.pokemonList){

      var displayPokemon = this.state.pokemonList.pokemon.slice(0,2).map(function(pokemon){
        return <Pokemon key={pokemon.name} name={pokemon.name} data={this.state.pokemonStats} url={pokemon.resource_uri} getPokemonStats={this.getPokemonStats} />;
      }.bind(this));

      // this.filterPokemon("c");
    }

    return (
      <div className="wrapper">{displayPokemon}</div>
    );
  }
});

module.exports = Pokedex;