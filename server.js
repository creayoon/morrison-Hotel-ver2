#!/usr/bin/env node
require('source-map-support').install();
require('./dist-server/server/index.js').default();
require("babel-core").transform("code", {
  presets: ["typescript"]
});