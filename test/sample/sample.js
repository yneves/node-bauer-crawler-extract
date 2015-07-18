// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var assert = require("assert");
var Crawler = require("bauer-crawler");

var crawler = new Crawler();

crawler.require(__dirname + "/../../");

crawler.ready(function() {
  
  this.promise()
    .extract(__dirname + "/sample.json",{
      json: true,
      extract: "$..url"
    })
    .then(function(values) {
      assert.deepEqual(values,["/","/"]);
    })
    .extract(__dirname + "/sample.txt",/([0-9]{2}\/[0-9]{2}\/[0-9]{2,4})/g)
    .then(function(values) {
      assert.deepEqual(values,["13/09/2013","02/09/2013"]);
    })
    .exit();
  
  
});

crawler.start();

// - -------------------------------------------------------------------- - //
