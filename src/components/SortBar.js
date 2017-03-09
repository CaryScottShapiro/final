var React = require('react');

var SortBar = React.createClass({
  viewChanged: function(view) {
    this.props.viewChanged(view)
  },
  render: function() {
    if (this.props.currentView === 'latest') {
      var latestClassName = 'active'
      var alphaClassName = ''
      var mapClassName = ''
    } else if (this.props.currentView === 'alpha') {
      var latestClassName = ''
      var alphaClassName = 'active'
      var mapClassName = ''
    } else if (this.props.currentView === 'map') {
      var latestClassName = ''
      var alphaClassName = ''
      var mapClassName = 'active'
    }
    return (
      <div className="sort row">
        <div className="col-sm-12">
          <ul className="nav nav-pills">
            <li className={latestClassName}><a href="#" onClick={() => this.viewChanged('latest')}>Latest Releases</a></li>
            <li className={alphaClassName}><a href="#" onClick={() => this.viewChanged('alpha')}>A-Z</a></li>
            <li className={mapClassName}><a href="#" onClick={() => this.viewChanged('map')}>Where to Watch</a></li>
            <li className="nav-text pull-right">{this.props.movieCount} movies</li>
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = SortBar;
