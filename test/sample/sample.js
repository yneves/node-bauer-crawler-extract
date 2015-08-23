// - -------------------------------------------------------------------- - //

"use strict";

var assert = require("assert");
var Crawler = require("bauer-crawler");

var crawler = new Crawler();

crawler.loadPlugin(__dirname + "/../../");

crawler.start(function() {
  
  return this.promise()
    .extract(__dirname + "/sample.json","$..url")
    .then(function(values) {
      assert.deepEqual(values,["/","/"]);
    })
    .extract(__dirname + "/sample.json",["$..url","$.ids[*].title"])
    .then(function(values) {
      assert.deepEqual(values,[
        ["/","/"],
        ["Go back to the home page","Go back to the home page"]
      ]);
    })
    .extract(__dirname + "/sample.txt",/([0-9]{2}\/[0-9]{2}\/[0-9]{2,4})/g)
    .then(function(values) {
      assert.deepEqual(values,["13/09/2013","02/09/2013"]);
    })
    .extract(__dirname + "/sample.txt",[/([0-9]{2}\/[0-9]{2}\/[0-9]{2,4})/g,/(Declara)/])
    .then(function(values) {
      assert.deepEqual(values,[
        ["13/09/2013","02/09/2013"],
        ["Declara"]
      ]);
    });
});

// - -------------------------------------------------------------------- - //
