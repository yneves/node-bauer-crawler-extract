/*!
**  bauer-crawler-extract -- Plugin for bauer-crawler to extract values from JSON content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-extract>
*/
// - -------------------------------------------------------------------- - //

"use strict";

module.exports = {
  
  extract: {
    
    // .extract(extract String) :Promise
    s: function(extract) {
      return this.then(function(source) {
        return this.promise().extract(source,extract);
      });
    },
    
    // .extract(extract RegExp) :Promise
    r: function(extract) {
      return this.then(function(source) {
        return this.promise().extract(source,{ extract: extract.toString() });
      });
    },
    
    // .extract(options Object) :Promise
    o: function(options) {
      return this.then(function(source) {
        return this.promise().extract(source,options);
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
        return this.promise().extract(source,{ extract: extract });
      });
    },
    
    // .extract(source String, extract RegExp) :Promise
    sr: function(source,extract) {
      return this.then(function() {
        return this.promise().extract(source,{ extract: extract.toString() });
      });
    }
    
  }
};

// - -------------------------------------------------------------------- - //
