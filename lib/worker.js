/*!
**  bauer-crawler-extract -- Plugin for bauer-crawler to extract values from JSON content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-extract>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var jp = require("jsonpath");
var request = require("request");
var Cache = require("bauer-cache");

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  worker.on("request",function(options,response) {
    
    var input = new Cache({
      json: true,
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
            
            doExtract(data,options,function(error,values) {
              if (error) {
                response.sendError(error);
              } else {
                response.sendOk({
                  values: values
                });
              }
            });
          }
        });
          
      // cache does not exists, make http request
      } else {
        response.sendError(new Error("input not found"));
      }
    });
  });
  
  worker.send({ ready: true });
  
};

// - -------------------------------------------------------------------- - //

function doExtract(data,options,callback) {
  var error = null;
  var values;
  try {
    values = jp.query(data,options.extract);
  } catch(e) {
    error = e;
  }
  callback(error,values);
}

// - -------------------------------------------------------------------- - //
