let request = require('request') // request package

const AMap_Address_REST_URL = "https://restapi.amap.com/v3/geocode/geo?" //The aMap Web Url - address
const AMap_Location_REST_URL = "https://restapi.amap.com/v3/geocode/regeo?" //The aMap Web Url - location
const AMap_IP_REST_URL = "https://restapi.amap.com/v3/ip?" //The aMap Web Url - ip

let outputType = "";

module.exports = function getAMapData(options, callBack) {
    let reciveOptions = {};
    if (options && Object.prototype.toString.call(options) === "[object Object]") {
        reciveOptions = options;
    }
    if (!reciveOptions.api_key) {
        throw Error('api_key is must but empty')
    }
    let params = [];
    params.push("key=" + reciveOptions.api_key);
    if (reciveOptions.output_type == 'xml') {
        params.push("output=xml");
        outputType = "xml";
    }
    switch (options.queryType) {
        case "address":
            if (!reciveOptions.address) {
                throw Error('address is must but empty')
            }
            params.push("address=" + reciveOptions.address);
            if (reciveOptions.batch == true) {
                params.push("batch=true");
            }
            handelData(AMap_Address_REST_URL + params.join("&"), callBack);
            break
        case "location":
            if (!reciveOptions.point_coord) {
                throw Error('point_coord is must but empty')
            }
            params.push("location=" + reciveOptions.point_coord);
            if (reciveOptions.batch == true) {
                params.push("batch=true");
            }
            if (reciveOptions.extensions == "all") {
                params.push("extensions=all");
            }
            if (reciveOptions.extensions == "all" && reciveOptions.poitype) {
                params.push("poitype=" + reciveOptions.poitype);
            }
            if (reciveOptions.extensions == "all" && reciveOptions.radius) {
                params.push("radius=" + reciveOptions.radius);
            }
            handelData(AMap_Location_REST_URL + params.join("&"), callBack);
            break
        case "ip":
            params.push("ip=" + (reciveOptions.ip || ""));
            handelData(AMap_IP_REST_URL + params.join("&"), callBack);
            break
        default:
            if (!reciveOptions.address) {
                throw Error('address is must but empty')
            }
            params.push("address=" + reciveOptions.address);
            if (reciveOptions.batch == true) {
                params.push("batch=true");
            }
            handelData(AMap_Address_REST_URL + params.join("&"), callBack);
            break
    }
}

//Handel Data And Callback
function handelData(requestUrl, callBack) {
    requestPromise(requestUrl).then(function (res) {
        let errorData = null;
        let callData = {};
        if (outputType == 'xml') {
            typeof callBack == 'function' ? callBack(errorData, res) : false; // XML Doc Type Is Only Callback
            return
        }
        let data = JSON.parse(res);
        if (data.status == '1') {
            // Success Handel
            callData = data;
        } else {
            // Error Handel
            errorData = data;
        }
        typeof callBack == 'function' ? callBack(errorData, callData) : false
    }, function (err) {
        typeof callBack == 'function' ? callBack(true, err) : false
    })
}

// AMap Request Function
function requestPromise(requestUrl) {
    return new Promise((resolve, reject) => {
        request(encodeURI(requestUrl), (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve(body);
        })
    })
}