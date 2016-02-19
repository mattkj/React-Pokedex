var React = require('react');

var FilterAndSort = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="col-xs-12 col-sm-5 col-sm-offset-1">
          <input className="form-control" value={this.props.filterValue} onChange={this.props.handleFilterChange} placeholder="Name or Number to filter by" />
        </div>
        <div className="col-xs-12 col-sm-5">
          <select className="form-control" value={this.props.sortValue} onChange={this.props.handleSortChange}>
            <option value="nameAsc">A-Z</option>
            <option value="nameDsc">Z-A</option>
            <option value="numberAsc">Lowest Number</option>
            <option value="numberDsc">Highest Number</option>
          </select>
        </div>
      </div>
    )
  }
});

module.exports = FilterAndSort;