var React = require('react');
var Pokemon = require('./Pokemon.jsx');

var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');
var PokemonListStore = require('../reflux/pokemonList-store.jsx');

var Pokedex = React.createClass({
  mixins: [Reflux.connect(PokemonListStore,"pokemonList")],

  getInitialState: function(){
    return {pokemonList: null};
  },
  componentDidMount: function(){
    Actions.getPokemonList();
  },
  render: function(){
    if (this.state.pokemonList){
      var displayPokemon = this.state.pokemonList.pokemon.slice(0,2).map(function(pokemon){
        console.log(pokemon);
        return <Pokemon key={pokemon.name} url={pokemon.resource_uri} />;
      });
    }

    return (
      <div className="container">
        <div className="wrapper">{displayPokemon}</div>
      </div>
    );
  }
});

module.exports = Pokedex;