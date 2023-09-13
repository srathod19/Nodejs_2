const express = require('express');
const conn = require('../../config/database');
const router = express.Router();
const user_model = require('./user_model');
const middleware = require('../../middleware/headerValidator');
const GLOBALS = require('../../config/constant');
var cryptoLib = require("cryptlib");

var shaKey = cryptoLib.getHashSha256(GLOBALS.KEY, 32);
// const { body, validationResult } = require('express-validator');
// const { signupValidation, loginValidation } = require('../../middleware/headerValidator')
const jwt = require('jsonwebtoken');
const secretKey = "secretKey";

router.post('/home', (req, res) => {
    // res.send({ "name": "sachin" })
    var username = req.body.username;
    var email = req.body.email;
    console.log(req.body);

    conn.query(`INSERT INTO tbl_admin (username,email) VALUES('${username}','${email}')`, function (err, result) {
        console.log(this.sql);
        if (result) {
            res.status(200).send({ "msg": result })
        } else {
            res.status(404).send({ "msg": "not found" })

        }
    })

});
// router.post('/test', body('username').isLength({ min: 1 }), (req, res) => {
//     console.log('done')
//     const result = validationResult(req);
//     console.log(result.array())
//     // return
//     if (!result.isEmpty()) {
//         return res.status(400).json({ errors: result.array() });
//     } else { 
//         // res.json({ 'data': req.body }
//         user_model.getAll(req, res);
//     }
// });
router.post('/signup', function (req, res) {
    const user = {
        username: req.body.username,
        email: req.body.email
    }
    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {

        var username = req.body.username;
        var email = req.body.email;


        conn.query(`INSERT INTO tbl_admin (username,email) VALUES('${username}','${email}')`, function (err, result) {
            console.log(this.sql);
            if (result.insertId) {
                conn.query(`INSERT INTO tbl_token (token,user_id) VALUES('${token}','${result.insertId}')`, function (errToken, resultToken) {
                    if (resultToken) {

                        res.status(200).send({ "msg": "Success" })
                    } else {

                        res.status(404).send({ "msg": "Failed" })
                    }
                })
            } else {
                res.status(404).send({ "msg": "not found" })

            }
        })
    })
})

router.post('/getDetails', (req, res) => {
    // console.log(req.headers);
    conn.query(`SELECT * FROM tbl_admin ta
            JOIN tbl_token tk ON ta.admin_id=tk.user_id 
            WHERE tk.token = '${req.headers.token}'`, function (err, result) {
        // console.log(this.sql);
        if (result) {
            // console.log(result[0].username);
            var us = cryptoLib.encrypt(result[0].username, shaKey, GLOBALS.IV);
            console.log(us);
            res.status(200).send({ "msg": result })
        } else {
            res.status(404).send({ "msg": "Not Found" })

        }
    })
});
router.post('/test', (req, res) => {
    console.log('done')
    var rules = {
        username: "required",
        email: "required",
    };

    if (middleware.checkValidationRules(req, res, rules, {})) {
        user_model.getAll(req, res);
    }

});

module.exports = router;