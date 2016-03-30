var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

var appReducer = function (state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

var store = Redux.createStore( appReducer );

var App = require('./jsx/App.jsx');
var Login = require('./jsx/Login.jsx');

var path = window.location.pathname;
if (path[path.length - 1] == '/') {
  path = path.substring(0, path.length - 1);
}

path = path.substring( path.lastIndexOf('/') );
console.log("path: " + path);

var RoutedComponent = null;
switch (path) {
  case '/login':
      RoutedComponent = Login
    break;
  default:
    RoutedComponent = App
};

ReactDOM.render(
    <RoutedComponent store={store} />,
    document.getElementById('app')
);

console.log("App loaded!");
