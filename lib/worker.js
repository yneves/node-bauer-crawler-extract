/*!
**  bauer-crawler-extract -- Plugin for bauer-crawler to extract values from JSON content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-extract>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var jsonPath = require("jsonpath");
var Cache = require("bauer-cache");
var factory = require("bauer-factory");

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  worker.on("request",function(options,response) {
    
    var isArray = factory.isArray(options.extract);
    var isJSON = isArray ? 
      options.extract && !options.extract[0].indexOf("$") : 
      options.extract && !options.extract.indexOf("$");
    
    var input = new Cache({
      json: isJSON,
      file: options.source
    });
    
    input.exists(function(error,exists) {
      if (error) {
        response.sendError(error);
        
      } else if (exists) {
        
        input.read(function(error,data) {
          if (error) {
            response.sendError(error);
          } else {
            
            var values;
            if (isArray) {
              values = options.extract.map(function(extract) {
                return doExtract(data,extract);
              });
            } else if (options.extract){
              values = doExtract(data,options.extract);
              
            } else if (options.lines === true) {
              values = data.split(/\n/);
              
            } else if (options.raw === true) {
              values = data;
            } else {
              values = "";
            }
            
            response.sendOk({
              values: values
            });
          }
        });
          
      // cache does not exists, make http request
      } else {
        response.sendError(new Error("input not found"));
      }
    });
  });
  
  worker.sendReady();
  
};

// - -------------------------------------------------------------------- - //

function doExtract(data,extract) {
  var error = null;
  var values;
  
  // json - path
  if (extract.indexOf("$") === 0) {
    try {
      values = jsonPath.query(data,extract);
    } catch(e) {
      error = e;
    }
  
  // text - regexp
  } else if (extract.indexOf("/") === 0) {
    var regexp = RegExp.apply(undefined, /^\/(.*)\/(.*)/.exec(extract).slice(1));
    try {
      values = data.match(regexp);
    } catch(e) {
      error = e;
    }
    if (values) {
      values = Array.prototype.slice.call(values,1);
    }
  }
  
  return values;
}

// - -------------------------------------------------------------------- - //
