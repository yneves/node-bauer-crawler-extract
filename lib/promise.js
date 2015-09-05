/*!
**  bauer-plugin-extract -- Plugin for bauer-crawler to extract values from JSON content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-plugin-extract>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var factory = require("bauer-factory");

module.exports = {
  
  extract: {
    
    // .extract(extract String) :Promise
    s: function(extract) {
      return this.then(function(source) {
        return this.Promise.extract(source,extract);
      });
    },
    
    // .extract(extract RegExp) :Promise
    r: function(extract) {
      return this.then(function(source) {
        return this.Promise.extract(source,{ extract: extract.toString() });
      });
    },
    
    // .extract(batch Array) :Promise
    a: function(batch) {
      var extract = batch.map(function(item) {
        return factory.isString(item) ? item : item.toString();
      });
      return this.then(function(source) {
        return this.Promise.extract(source,{ extract: extract });
      });
    },
    
    // .extract(options Object) :Promise
    o: function(options) {
      return this.then(function(source) {
        return this.Promise.extract(source,options);
      });
    },
    
    // .extract(source String, options Object) :Promise
    so: function(source,options) {
      options.source = source;
      return this.then(function() {
        return this.requestWorker("extract",options).get("values");
      });
    },
    
    // .extract(source String, extract String) :Promise
    ss: function(source,extract) {
      return this.then(function() {
        return this.Promise.extract(source,{ extract: extract });
      });
    },
    
    // .extract(source String, extract RegExp) :Promise
    sr: function(source,extract) {
      return this.then(function() {
        return this.Promise.extract(source,{ extract: extract.toString() });
      });
    },
    
    // .extract(source String, batch Array) :Promise
    sa: function(source,batch) {
      var extract = batch.map(function(item) {
        return factory.isString(item) ? item : item.toString();
      });
      return this.then(function() {
        return this.Promise.extract(source,{ extract: extract });
      });
    },
    
  }
};

// - -------------------------------------------------------------------- - //
