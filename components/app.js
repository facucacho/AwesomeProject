/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var MovieList = require('./movieList');
var MovieDetail = require('./movieDetail');
var {
  AppRegistry,
  Navigator,
} = React;

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  if (route.name === 'list') {
    return (
      <MovieList navigator={navigationOperations} />
    );
  } else if (route.name === 'movie') {
    return (
      <MovieDetail navigator={navigationOperations}
      movie={route.movie} />
    );
  }
};

var App = React.createClass({
  render: function() {
    return (
      <Navigator initialRoute={{ name: 'list', }}
      renderScene={ RouteMapper } />
    );
  }

});



module.exports = App;
