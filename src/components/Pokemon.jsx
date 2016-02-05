var React = require('react');
var Image = require('./Image.jsx');
var Type = require('./Type.jsx');

var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');
var PokemonStore = require('../reflux/pokemon-store.jsx');

var Pokemon = React.createClass({
  mixins: [Reflux.connect(PokemonStore,"pokemonStats")],

  getInitialState: function(){
    return {pokemonStats: null};
  },
  componentDidMount: function(){
    Actions.getPokemonStats(this.props.url);
  },
  formatNumber: function(number){
    var length = number.toString().length;
    
    switch (length){
      case 1:
        return '#' + ('00' + number).slice(-4);
        break;
      case 2:
        return '#' + ('0' + number).slice(-4);
        break;
      default:
        return '#' + number;
    };
  },
  render: function(){
    var data = this.state.pokemonStats;

    if (data){
      var name = data.name;
      var number = this.formatNumber(data.national_id);
      var image = <Image url={data.sprites[0].resource_uri} />;
      var types = data.types.map(function(type){
        return <Type key={type.name} name={type.name} id={type.resource_uri} />;
      });
    };

    return (
      <div className="pokemon">
        <div>{image}</div>
        <div>{number}</div>
        <h4>{name}</h4>
        <div>{types}</div>
      </div>
    );
  }
});

module.exports = Pokemon;