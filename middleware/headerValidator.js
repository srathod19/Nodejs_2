
var headerValidator = {
    checkValidationRules: function (request, response, rules, messages, keywords) {
        // console.log(response.body);
        // console.log(response);
        var v = require('validator').make(request, rules, messages, keywords);
        if (v.fails()) {
            var Validator_errors = v.getErrors();
            for (var key in Validator_errors) {
                error = Validator_errors[key][0];
                break;
            }
            response_data = {
                code: '0',
                message: error
            };
            headerValidator.encryption(response_data, function (responseData) {
                response.status(200);
                response.json(responseData);
            });
            return false;
        } else {
            console.log('validation succeed');
            return true;
        }
    },
    sendresponse: function (req, res, statuscode, responsecode, responsemessage, responsedata) {
        headerValidator.getMessage(req.lang, responsemessage.keyword, responsemessage.components, function (formedmsg) {
            if (responsedata != null) {
                response_data = { code: responsecode, message: formedmsg, data: responsedata };
                headerValidator.encryption(response_data, function (response) {
                    res.status(statuscode);
                    res.json(response);
                });
            } else {
                response_data = { code: responsecode, message: formedmsg };
                headerValidator.encryption(response_data, function (response) {
                    res.status(statuscode);
                    res.json(response);
                    console.log(response);
                    console.log('response');
                });
            }
        });
    },
}
module.exports = headerValidator;