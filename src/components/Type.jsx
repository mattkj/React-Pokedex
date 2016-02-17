var React = require('react');

var Type = React.createClass({
  render: function(){

    //get type id from api resource url
    var pathArray = this.props.id.split( '/' );
    var id = pathArray[4];

    return (
      <div className={"type type-" + id}>{this.props.name}</div>
    );
  }
});

module.exports = Type;