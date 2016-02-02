var React = require('react');
var Pokemon = require('./Pokemon.jsx');

var Pokedex = React.createClass({
  render: function(){
    return (
      <div className="container">
        <button className="btn btn-danger"><Pokemon /></button>
      </div>
    );
  }
});

module.exports = Pokedex;