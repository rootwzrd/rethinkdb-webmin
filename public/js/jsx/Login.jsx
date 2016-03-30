var React = require('react');

var Tools = require('../Tools.js');

var Login = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();
    console.log("submitting!");

    var req = new XMLHttpRequest();
    req.open('POST', '/api/login', true);
    req.setRequestHeader('Content-Type', 'application/json');
    var data = {password: this.refs.password.value};
    req.send( JSON.stringify(data) );
    req.onload = function () {
      console.log("req.onload");
      if (req.status >= 200 && req.status < 400) {
        console.log("success");
        window.location.pathname = '/';
      } else {
        console.log("failed");
      }
    };
  },
  render: function () {
    return (
      <div>
        Login
        <form onSubmit={this.onSubmit}>
          <input type="password" ref="password"></input>
          <input type="submit" value="login"></input>
        </form>
      </div>
    );
  }
});

module.exports = Login;
