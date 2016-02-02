var React = require('react');
var HTTP = require('../services/http.js');

var Pokemon = React.createClass({
  getInitialState: function(){
    return {pokemonStats: null};
  },
  componentDidMount: function(){
    HTTP.get(this.props.url)
    .then(function(data) {
      this.setState({pokemonStats: data});
    }.bind(this));
  },
  render: function(){
    var data = this.state.pokemonStats;

    if (data){
      var name = data.name;
      var number = '#' + data.national_id;
      var image = data.sprites[0].resource_uri;
      var types = data.types.map(function(type){
        return type.name + ' ';
      });
    };

    return (
      <div>
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