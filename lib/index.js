/*!
**  bauer-crawler-extract -- Plugin for bauer-crawler to extract values from JSON content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-extract>
*/
// - -------------------------------------------------------------------- - //

"use strict";

module.exports = {
  
  name: "extract",
  
  config: {
    workers: 1
  },
  
  worker: __dirname + "/worker.js",
  master: __dirname + "/master.js",
  promise: __dirname + "/promise.js"
  
};

// - -------------------------------------------------------------------- - //
