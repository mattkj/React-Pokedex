var React = require('react');

var Image = React.createClass({
  render: function(){
    var url = this.props.url;
    var img = <div className="placeholder-image"><img src="loader.gif" /></div>;

    if (url){
      var imgSrc = "http://pokeapi.co" + url;
      img = <img src={imgSrc} />;
    };

    return (
      <span>{img}</span>
    );
  }
});

module.exports = Image;