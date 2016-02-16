var React = require('react');
var HTTP = require('../services/http.js');
var Image = require('./Image.jsx');
var Type = require('./Type.jsx');

var Pokemon = React.createClass({
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
    var data = this.props.data;

    // console.log('this.props.data:',data);
    // console.log(this.props.name + ' rendered');

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