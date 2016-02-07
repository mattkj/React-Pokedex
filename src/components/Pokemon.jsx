var React = require('react');
var Image = require('./Image.jsx');
var Type = require('./Type.jsx');

var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');
var PokemonStatsStore = require('../reflux/pokemonStats-store.jsx');

var Pokemon = React.createClass({
  // mixins: [Reflux.connect(PokemonStatsStore,"pokemonStats")],
  mixins: [Reflux.listenTo(PokemonStatsStore, "onChange")],
  getInitialState: function(){
    return {pokemonStats: null};
  },
  componentDidMount: function(){
    Actions.getPokemonStats(this.props.url);
  },
  onChange: function(data){
    this.setState({pokemonStats: data});
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
    console.log(data);

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