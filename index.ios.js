/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  PixelRatio,
  Navigator,
  ScrollView,
  StyleSheet,
  WebView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  AppRegistry,
} = React;

var cssVar = require('cssVar');

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  /* No right nav */
  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

var ROUTE_STACK = [
  {'url' : '#home', 'title' : 'Home'},
];

var NavigatorExample = React.createClass({

  componentWillMount: function() {
  },

  componentWillUnmount: function() {
  },

  renderScene: function(route, navigator) {

    if(route.url === "#home") {
      return(
          <ScrollView style={styles.scene}>

            <Text style={styles.messageText} onPress={() => {
                navigator.push({'url' : 'http://www.reddit.com', 'title' : 'Reddit'})
            }}> Reddit </Text>

            <Text style={styles.messageText} onPress={() => {
                navigator.push({'url' : 'http://www.CNN.com', 'title' : 'CNN'})
            }}> CNN </Text>
          </ScrollView>    
      );
    } else {
       return (
          <WebView
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            url={route.url}
            javaScriptEnabledAndroid={true}
            startInLoadingState={true}
          />
      );      
    }
  },

  render: function() {

    var homeList;
    var currScene;


    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={ROUTE_STACK[0]}
        initialRouteStack={ROUTE_STACK}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  },

});

var styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 15,
    marginTop: 50,
  },
  scene: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },  

});

AppRegistry.registerComponent('NavigatorExample', () => NavigatorExample);
