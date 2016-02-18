var React = require('react');
var HTTP = require('../services/http.js');
var Pokemon = require('./Pokemon.jsx');

var Pokedex = React.createClass({
  getInitialState: function(){
    return {pokemonList: null, sortValue: 'nameAsc'};
  },
  componentDidMount: function(){
    this.getPokemonList();
  },
  getPokemonList: function(){
    HTTP.get('/api/v1/pokedex/1/')
    .then(function(data) {
      this.setState({pokemonList: data.pokemon.slice(0, 24)});
      this.sortPokemon(this.state.sortValue);
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

  filterPokemon(){
    var filteredList = this.state.pokemonList.filter(function(pokemon){
      return pokemon.name <= "c";
    });
    this.setState({pokemonList: filteredList});
  },

  sortPokemon(sortBy){
    var sortedList = this.state.pokemonList.sort(function(a, b){
      switch (sortBy){
        case 'nameAsc':
          return a.name.localeCompare(b.name);
          break;
        case 'nameDsc':
          return b.name.localeCompare(a.name);
          break;
        case 'numberAsc':
          return parseInt(a.stats.national_id) - parseInt(b.stats.national_id);
          break;
        case 'numberDsc':
          return parseInt(b.stats.national_id) - parseInt(a.stats.national_id);
          break;
      };
    });
    this.setState({pokemonList: sortedList});
  },

  handleSortChange(e){
    this.setState({sortValue: e.target.value});
    this.sortPokemon(e.target.value);
  },

  render: function(){
    if (this.state.pokemonList){
      var displayPokemon = this.state.pokemonList.map(function(pokemon){
        return <Pokemon key={pokemon.name} name={pokemon.name} data={pokemon.stats} />;
      }.bind(this));
    }

    return (
      <div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={this.filterPokemon}>Filter</button>
          <select value={this.state.sortValue} onChange={this.handleSortChange} className="form-control">
            <option value="nameAsc">A-Z</option>
            <option value="nameDsc">Z-A</option>
            <option value="numberAsc">Lowest Number</option>
            <option value="numberDsc">Highest Number</option>
          </select>
        </div>
        <div className="wrapper">{displayPokemon}</div>
      </div>
    );
  }
});

module.exports = Pokedex;