//config db connection
const bcrypt = require("bcryptjs");

let create_account = (req, res) => {
    const username = req.headers.username;
    const email = req.headers.email;
    const hash = bcrypt.hashSync(req.headers.password, 10);
    const type = req.headers.type;
    const created_at = new Date().toISOString();

    let stmt = `INSERT INTO 'accounts' ('username','email','password', 'type' , 'created_at') VALUES ('${username}','${email}','${hash}','${type}','${created_at}')`

    connection.query(stmt, function(error, results, fields) {
        if (error) {
            res.status(401).json({
                message: "Username already existed!"
            });
            return;
        }
        if (results[0] == undefined) {
            res.status(200).json({
                message: "Successfully registered!"
            });
        }
    });
}

module.exports = { create_account }