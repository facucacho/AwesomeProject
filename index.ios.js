/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    } = React;

var REQUEST_URL = 'https://api.aula365.com/v2/fsvas/videos?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJBdWxhVXNlciI6IjEzMjEzMjY2IiwiRW50aXR5IjoiNzMiLCJpc3MiOiJodHRwczovL2lkc3J2My5jb20iLCJhdWQiOiJodHRwczovL2lkc3J2My5jb20vcmVzb3VyY2VzIiwiZXhwIjoxNDQ2Njg5ODY2fQ.CVjOSRzm1u59DtZt4iY4gdlWHkTN1D2BqCMiKWyVZj_GuLoNH3UDjZK6cJa9SIDEwZDod84gsxH5AWLc8ZjLG_NP0vL80GiL27UdvDbHIno9afS5wQHEuGDnyVGi83nwY6N0GkIbQHMmfMwjF0gDgkf4m8HRhKAP-ZO3dGbdQv5WsRHnK1TE3iqYaXV-d7Ga01FYf7cspb4Y2sgCBaZlvKNcft1Hz1C_toYGDz4BIo_4HKmtr2OCNEKBemQ8QAXS_oUJLpRVbxvIY7h9Z7myg6shh71hxic1E0AXWi-9ktUhqdh8T-nbKBxOLWFljjpzXzgE1EPyFojUP9XG8zgfeg';

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  if (route.name === 'list') {
    return (
      <AwesomeProject navigator={navigationOperations} />
    );
  } else if (route.name === 'movie') {
    return (
      <VideoDetail
          navigator={navigationOperations}
          movie={route.movie}
        />
    );
  }
};

var App = React.createClass({
  render: function() {
    return (
      <Navigator 
        initialRoute={{ name: 'list', }}
        renderScene={ RouteMapper }
      />
    );
  }

});

var AwesomeProject = React.createClass({
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
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}
          />
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
      <TouchableHighlight
        onPress={() => {
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
          <Image
          source={{uri: movie.thumbnail}}
          style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
},
});

var VideoDetail = React.createClass({
  getInitialState: function(){
    return null;
  },

  render: function(){
    return (
      <View style={styles.detailContainer}>
        <Image source={{uri: this.props.movie.thumbnail}} style={styles.bigImage} />
        <Text>{this.props.movie.title}</Text>
        <Text>{this.props.movie.description}</Text>
      </View>
      );
  }
})

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
    detailContainer: 
    {
      flex:1
    },
    bigImage:
    {
        flex:1
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('AwesomeProject', () => App);


