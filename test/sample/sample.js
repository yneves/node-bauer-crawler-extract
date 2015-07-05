// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var assert = require("assert");
var Crawler = require("bauer-crawler");

var crawler = new Crawler();

crawler.require(__dirname + "/../../");

crawler.ready(function() {
  
  this.promise()
    .extract(__dirname + "/sample.json","$..url")
    .then(function(values) {
      assert.deepEqual(values,[
        "/",
        "/"
      ]);
    })
    .exit();
  
  
});

crawler.start();

// - -------------------------------------------------------------------- - //
