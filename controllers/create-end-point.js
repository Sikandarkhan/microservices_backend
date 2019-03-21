var config = require('../config/config.js');
//console.log("config::",config);
var moment = require('moment');
var CryptoJS = require("crypto-js");
module.exports.endPoint = (req,res) => {

function SigV4Utils() {}

SigV4Utils.sign = function (key, msg) {
    var hash = CryptoJS.HmacSHA256(msg, key);
    return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.sha256 = function (msg) {
    var hash = CryptoJS.SHA256(msg);
    return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.getSignatureKey = function (key, dateStamp, regionName, serviceName) {
    var kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
    var kRegion = CryptoJS.HmacSHA256(regionName, kDate);
    var kService = CryptoJS.HmacSHA256(serviceName, kRegion);
    var kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
    return kSigning;
};

function createEndpoint(regionName, awsIotEndpoint, accessKey, secretKey) {
    //console.log("aws region:",regionName);
    var time = moment.utc();
    var dateStamp = time.format('YYYYMMDD');
    var amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
    var service = 'iotdevicegateway';
    var region = regionName;
    var secretKey = secretKey;
    var accessKey = accessKey;
    var algorithm = 'AWS4-HMAC-SHA256';
    var method = 'GET';
    var canonicalUri = '/mqtt';
    var host = awsIotEndpoint;
    var credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
    var canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';

    canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
    canonicalQuerystring += '&X-Amz-Date=' + amzdate;
    canonicalQuerystring += '&X-Amz-SignedHeaders=host';

    var canonicalHeaders = 'host:' + host + '\n';
    var payloadHash = SigV4Utils.sha256('');
    var canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;
    var stringToSign = algorithm + '\n' + amzdate + '\n' + credentialScope + '\n' + SigV4Utils.sha256(canonicalRequest);
    var signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
    var signature = SigV4Utils.sign(signingKey, stringToSign);
    canonicalQuerystring += '&X-Amz-Signature=' + signature;
    //canonicalQuerystring += '&X-Amz-Security-Token=' + encodeURIComponent("");
    return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
}
var endpoint = createEndpoint(
     
    config.REGION,  // YOUR REGION
    config.END_POINT,  // YOUR IoT ENDPOINT
    config.ACCESS_KEY_ID, // YOUR ACCESS KEY   
    config.SECRET_ACCESS_KEY// YOUR SECRET ACCESS KEY 
    ); 
    res.send({status:'success',endPoint:endpoint,topic: config.TOPIC});
};