const conn = require('../../config/database');
var User = {
    getAll: function (req, res) {
        var username = req.body.username;
        var email = req.body.email;
        // console.log(req.body);

        conn.query(`INSERT INTO tbl_admin (username,email) VALUES('${username}','${email}')`, function (err, result) {
            console.log(this.sql);
            if (result) {
                res.status(200).send({ "msg": "Success" })
            } else {
                res.status(404).send({ "msg": "not found" })

            }
        })
    },
    uploadImg: function (req, res) {
        res.send("fiile uploaded");
    },
}

module.exports = User;