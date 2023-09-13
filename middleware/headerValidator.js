const GLOBALS = require("../config/constant");
var headerValidator = {
    // encrypt: function (req) {
    //     var cryptoLib = require('cryptlib');
    //     var shaKey = cryptoLib.getHashSha256(GLOBALS.KEY, 32);
    //     var response = cryptoLib.encrypt(JSON.stringify(response_data), shaKey, GLOBALS.IV);
    //     return response;
    // }
}
module.exports = headerValidator;