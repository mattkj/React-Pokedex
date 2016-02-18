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
  componentDidUpdate: function(){
    // if (this.state.pokemonList[23].stats){
    //   this.sortPokemon(this.state.sortValue);
    // }
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
      // return parseInt(a.stats.national_id) - parseInt(b.stats.national_id);
      return a.name.localeCompare(b.name);
    });
    this.setState({pokemonList: sortedList});
    console.log('Sorted by: ',sortBy);
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