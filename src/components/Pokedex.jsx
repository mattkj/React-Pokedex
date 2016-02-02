var React = require('react');
var HTTP = require('../services/http.js');
var Pokemon = require('./Pokemon.jsx');

var Pokedex = React.createClass({
  getInitialState: function(){
    return (
      {pokemonList: null}
    );
  },
  componentDidMount: function(){
    HTTP.get('http://localhost:6060/pokemon')
    .then(function(data) {
      this.setState({pokemonList: data});
    }.bind(this));
  },
  render: function(){
    if (this.state.pokemonList){
      var displayPokemon = this.state.pokemonList.pokemon.map(function(pokemon){
        return pokemon.name;
      });
    }

    return (
      <div className="container">
        <button className="btn btn-danger"><Pokemon /></button>
        <ul>{displayPokemon}</ul>
      </div>
    );
  }
});

module.exports = Pokedex;