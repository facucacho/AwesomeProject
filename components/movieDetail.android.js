'use strict';

var React = require('react-native');
var VideoPlayer = require('./videoPlayer');

var {
  Image,
  View,
  Text,
  StyleSheet,
} = React;

var MovieDetail = React.createClass({
  getInitialState: function(){
    return null;
  },

  render: function(){
    return (
      <View style={styles.detailContainer}>
      <VideoPlayer></VideoPlayer>
      <Text>{this.props.movie.title}</Text>
      <Text>{this.props.movie.description}</Text>
      </View>
    );
  }
})

var styles = StyleSheet.create({
  detailContainer:
  {
    flex:1
  },
  bigImage:
  {
    flex:1
  },
});

module.exports = MovieDetail;
