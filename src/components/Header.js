var React = require('react')

var Header = React.createClass({
  greeting: function() {
    if (this.props.currentUser) {
      return (
        <span>
          Hi {this.props.currentUser.displayName}
          &nbsp;
          <a href="#" className="btn btn-link" onClick={this.props.logout}>
            <i className="fa fa-sign-out"></i>
          </a>
        </span>
      )
    } else {
      return (
        <a href="#" className="btn btn-link" onClick={this.props.login}>How about you sign in?</a>
      )
    }
  },
  render: function() {
    return (
      <div className="header row">
        <div className="col-sm-9">
          <h1>Buyflix</h1>
        </div>
        <div className="hello col-sm-3 text-center">
          <h2>{this.greeting()}</h2>
        </div>
      </div>
    )
  }
})

module.exports = Header;
