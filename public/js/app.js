var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

var App = require('./jsx/App.jsx');

var appReducer = function (state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

var store = Redux.createStore( appReducer );

ReactDOM.render(<App store={store} />, document.getElementById('app'));

console.log("App loaded!");
