"use strict";

let request = require('request'); // request package


const BING_REST_URL = "https://dev.virtualearth.net/REST/v1/Locations"; //The Bing Map Web Url

module.exports = function getBingMapData(options, callBack) {
  let reciveOptions = {};

  if (options && Object.prototype.toString.call(options) === "[object Object]") {
    reciveOptions = options;
  }

  if (!reciveOptions.api_key) {
    throw Error('api_key is must but empty');
  }

  const finallyOptions = {
    api_key: reciveOptions.api_key,
    max_results: reciveOptions.maxResults || 5,
    // The limit 1-20, default is 5
    output_type: reciveOptions.docType == 'xml' ? 'xml' : '',
    // The output doc type, default is JSON
    include_neighborhood: reciveOptions.inclnb || 0,
    // Is Include includeNeighborhood, default is not
    output_culture: reciveOptions.culture || '' //culture config options (www.bingmap.cn/guide/58bafd44-5a31-4aba-8fb0-f836374d71f6?module=doc)

  };

  if (options.isPoint) {
    // search by location
    if (!reciveOptions.point_coord) {
      throw Error('point_coord is must but empty');
    }

    finallyOptions.urlMap = BING_REST_URL + '/' + reciveOptions.point_coord + '?';
  } else {
    if (!reciveOptions.key_word) {
      // search by keyword
      throw Error('key_word is must but empty');
    }

    finallyOptions.urlMap = BING_REST_URL + '?q=' + reciveOptions.key_word + '&';
  }

  handelData(finallyOptions, callBack);
}; //Handel Data And Callback


function handelData(inputParams, callBack) {
  requestPromise(inputParams).then(function (res) {
    let errorData = null;
    let callData = {};

    if (inputParams.output_type == 'xml') {
      typeof callBack == 'function' ? callBack(errorData, res) : false; // XML Doc Type Is Only Callback

      return;
    }

    let data = JSON.parse(res);

    if (data.statusCode == 200) {
      // Success Handel
      callData = {
        statusCode: data.statusCode,
        totalNum: data.resourceSets[0].estimatedTotal,
        resData: data.resourceSets[0].resources,
        body: data
      };
    } else {
      // Error Handel
      errorData = {
        statusCode: data.statusCode,
        statusDescription: data.statusDescription,
        errorDetails: data.errorDetails,
        body: data
      };
    }

    typeof callBack == 'function' ? callBack(errorData, callData) : false;
  }, function (err) {
    typeof callBack == 'function' ? callBack(true, err) : false;
  });
} // Bing Map Request Function


function requestPromise(options) {
  return new Promise((resolve, reject) => {
    request(options.urlMap + 'c=' + options.output_culture + '&maxResults=' + options.max_results + '&o=' + options.output_type + '&inclnb=' + options.include_neighborhood + '&key=' + options.api_key, (error, response, body) => {
      if (error) {
        reject(error);
      }

      resolve(body);
    });
  });
}