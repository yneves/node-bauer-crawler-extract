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
    
    // .extract(source String, extract String) :Promise
    ss: function(source,extract) {
      return this.then(function() {
        return this.requestWorker("extract",{
          source: source,
          extract: extract
        }).get('values');
      });
    }
    
  }
};

// - -------------------------------------------------------------------- - //
