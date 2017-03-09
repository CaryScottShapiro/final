// React
var React = require('react')
var ReactDOM = require('react-dom')

// Google Maps
var ReactGMaps = require('react-gmaps')
var {Gmaps, Marker} = ReactGMaps

// Movie data
var movieData = require('./data/movies.json')
var theatres = require('./data/theatres.json')

// Components
var Header = require('./components/Header')
var MovieDetails = require('./components/MovieDetails')
var MovieList = require('./components/MovieList')
var NoCurrentMovie = require('./components/NoCurrentMovie')
var SortBar = require('./components/SortBar')

// Firebase configuration
var Rebase = require('re-base')
var base = Rebase.createClass({
  apiKey: "AIzaSyAiqFcEt_lHB1Wjnks0GdY6uGdiXqCJcuo",
  authDomain: "final-722d6.firebaseapp.com",
  databaseURL: "https://final-722d6.firebaseio.com",
})

var App = React.createClass({
  authChanged: function(user) {
    if (user) {
      this.setState({
        currentUser: user
      })
      console.log(user)
    } else {
      this.setState({
        currentUser: null
      })
      console.log("Logged out") }
  },
  loginComplete: function(error, response) {
    if (error) {
      console.log("Login failed")
    } else {
      console.log("Login succeeded")
    }
  },
  login: function() {
    base.authWithOAuthPopup('google', this.loginComplete)
  },
  logout: function() {
    base.unauth()
  },
  movieClicked: function(movie) {
    this.setState({
      currentMovie: movie
    })
  },
  movieWatched: function(movie) {
    var existingMovies = this.state.movies
    var moviesWithWatchedMovieRemoved = existingMovies.filter(function(existingMovie) {
      return existingMovie.id !== movie.id
    })
    this.setState({
      movies: moviesWithWatchedMovieRemoved,
      currentMovie: null
    })
  },
  resetMovieListClicked: function() {
    this.setState({
      movies: movieData.sort(this.movieCompareByTitle)
    })
  },
  viewChanged: function(view) {
    var movies;
    if (view === 'alpha') {
      movies = this.state.movies.sort(this.movieCompareByTitle)
    } else if (view === 'latest') {
      movies = this.state.movies.sort(this.movieCompareByReleased)
    } else if (view === 'map') {
      movies = this.state.movies.sort(this.movieCompareByReleased)
    }
    this.setState({
      currentView: view,
      movies: movies
    })
  },
  renderMovieDetails: function() {
    if (this.state.currentMovie == null) {
      return <NoCurrentMovie resetMovieListClicked={this.resetMovieListClicked} />
    } else {
      return <MovieDetails movie={this.state.currentMovie}
                           movieWatched={this.movieWatched} />
    }
  },
  renderMainSection: function() {
    if (this.state.currentView === 'map') {
      return (
        <div className="col-sm-12">
          <Gmaps width={'100%'}
            height={'480px'}
            lat={'41.9021988'}
            lng={'-87.6285782'}
            zoom={11}
            loadingMessage={'Movies soon...'}
            params={{v: '3.exp', key: 'AIzaSyB3p_xQIXsFMDGLYNEiVkgW5fsVSUOd01c'}}>
              {theatres.map(function(theatre) {
                return <Marker lat={theatre.lat} lng={theatre.long} />
              })}
          </Gmaps>
        </div>
      )
    } else {
      return (
        <div>
          <MovieList movies={this.state.movies} movieClicked={this.movieClicked} />
          {this.renderMovieDetails()}
        </div>
      )
    }
  },
  movieCompareByTitle: function(movieA, movieB) {
    if (movieA.title < movieB.title) {
      return -1
    } else if (movieA.title > movieB.title) {
      return 1
    } else {
      return 0
    }
  },
  movieCompareByReleased: function(movieA, movieB) {
    if (movieA.released > movieB.released) {
      return -1
    } else if (movieA.released < movieB.released) {
      return 1
    } else {
      return 0
    }
  },
  getInitialState: function() {
    return {
      movies: movieData.sort(this.movieCompareByReleased),
      currentMovie: null,
      currentView: 'latest'
    }
  },
  componentDidMount: function() {
    base.syncState('/movies', { context: this, state: 'movies', asArray: true })
    base.onAuth(this.authChanged)
  },
  render: function() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}
          login={this.login}
          logout={this.logout} />
        <SortBar movieCount={this.state.movies.length} viewChanged={this.viewChanged} currentView={this.state.currentView} />
        <div className="main row">
          {this.renderMainSection()}
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById("app"))
