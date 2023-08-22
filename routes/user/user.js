const express = require('express');
const conn = require('../../config/database');
const router = express.Router();
const user_model = require('./user_model')
const middleware = require('../../middleware/headerValidator')
// const { body, validationResult } = require('express-validator');
// const { signupValidation, loginValidation } = require('../../middleware/headerValidator')

router.post('/home', (req, res) => {
    // res.send({ "name": "sachin" })
    var username = req.body.username;
    var email = req.body.email;
    console.log(req.body);

    conn.query(`INSERT INTO tbl_admin (username,email) VALUES('${username}','${email}')`, function (err, result) {
        console.log(this.sql);
        if (result) {
            res.status(200).send({ "msg": "Success" })
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