'use strict';

/* istanbul ignore next */
// This file is an example, it's not functionally used by the module.

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var routes2 = require('./routes2');

// Initialize express
var app = express();
app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
  extended: true,
}));


// Set up the routes
routes.setup(app);
routes2.setup(app);

// Expose app
exports = module.exports = app;

// Start the server
var server = app.listen(3000, function startExpressServer() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
