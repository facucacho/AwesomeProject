'use strict';

var React = require('react-native');
var MovieDetail = require('./movieDetail');
var {
  Image,
  ListView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} = React;

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJBdWxhVXNlciI6IjE2MjQ2NjM0IiwiRW50aXR5IjoiNzMiLCJpc3MiOiJodHRwczovL2lkc3J2My5jb20iLCJhdWQiOiJodHRwczovL2lkc3J2My5jb20vcmVzb3VyY2VzIiwiZXhwIjoxNDQ2ODMxNTkyfQ.WfHzVsR9wplYU39Luu9ZN18iDxbgqRuvZDP20mN9dPl89JY2djgeg8ME3v9GNHagrWGU874ynrxqarbmFFojBOawqSfe4Wy5nXSVXujsIYjERFUsW43fwFtv_WrYbEAc4EAFVdxNok91zAJgyLZgpWWHRpwfq_P7Qr10wTgVbiak9vQo0diQstxwJc3DaeJMBBWvdIjPLbNLMaJePUbDlkOyhrlofyMd-u5m1OR6fS9t9KeaYpMHnZjuq0do8m8MAPxzoaE5_4MhTELWyzHmP_BEIoAoznidURSxdoYfapd2KChUREGemhNwmKTu0IZ6msOsZkY1mQsjchXW7zOf2g';
var REQUEST_URL = 'https://api.aula365.com/v2/fsvas/videos?token=' + token;

var MovieList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
      });
    })
    .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView dataSource={this.state.dataSource}
      renderRow={this.renderMovie}
      style={styles.listView} />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
      <Text>
      Loading movies...
      </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <TouchableHighlight onPress={() =>
        {
          this.props.navigator.push({
            title: movie.title,
            name: 'movie',
            movie: movie,
          });
        }
      }
      text="VIEW"
      >
      <View style={styles.container}>
      <Image source={{uri: movie.thumbnail}}
      style={styles.thumbnail} />
      <View style={styles.rightContainer}>
      <Text style={styles.title}>{movie.title}</Text>
      </View>
      </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 100,
    height: 70,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MovieList;
