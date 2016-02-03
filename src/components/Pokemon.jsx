var React = require('react');
var HTTP = require('../services/http.js');
var Image = require('./Image.jsx');

var Pokemon = React.createClass({
  getInitialState: function(){
    return {pokemonStats: null};
  },
  componentDidMount: function(){
    HTTP.get('/' + this.props.url)
    .then(function(data) {
      this.setState({pokemonStats: data});
    }.bind(this));
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
        return type.name + ' ';
      });
    };

    return (
      <div className="pokemon">
        <div>{image}</div>
        <div>{number}</div>
        <div>{name}</div>
        <div>{types}</div>
        <br />
      </div>
    );
  }
});

module.exports = Pokemon;