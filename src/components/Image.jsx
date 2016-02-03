var React = require('react');
var HTTP = require('../services/http.js');
var baseUrl = "http://pokeapi.co";

var Image = React.createClass({
  getInitialState: function(){
    return {pokemonImage: null};
  },
  componentDidMount: function(){
    HTTP.get(this.props.url)
    .then(function(data) {
      this.setState({pokemonImage: data});
    }.bind(this));
  },
  render: function(){
    var data = this.state.pokemonImage;

    if (data){
      var imgSrc = baseUrl + data.image;
    };

    return (
      <img src={imgSrc} />
    );
  }
});

module.exports = Image;