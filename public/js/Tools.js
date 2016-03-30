var Tools = {
  sendJson: function (type, url, data) {
    var req = new XMLHttpRequest();
    req.open(type, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send( JSON.stringify(data) );
    return req;
  }
};

module.exports = Tools;
