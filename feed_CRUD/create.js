// const connection = require('../system/db_connection')
// let feeds_create = (req, res) => {
//     const accId = req.headers.id;
//     const details = req.headers.details;
//     const type = req.headers.type;
//     const created_at = new Date().toISOString();

//     let createStmt = "INSERT INTO `feeds`(`account_id`, `details`, `type`, `created_at`) VALUES ('" +
//     req.headers.id +
//     "','" +
//     req.headers.details +
//     "','" +
//     req.headers.type +
//     "','" +
//     created_at +
//     "')";
//     connection.query(createStmt, function (error, results, fields) {
//         if (error) {
//             res.status(401).json({
//                 message: "ERROR"
//             });
//             return;
//         }
//         if (results[0] == undefined) {
//             res.status(200).json({
//                 message: "Successful!"
//             });
//         }
//     });
// }

// module.exports = { feeds_create }
const connection = require('../system/db_connection')
const created_at = new Date().toISOString()
let feeds_create = (req, res) => {
    let createStmt = "INSERT INTO `feeds` (`account_id`,`details`,`type`,`created_at`) VALUES('" + req.headers.id + "','" + req.headers.details + "','" + req.headers.type + "','" +
        created_at + "')"
    connection.query(createStmt, function (error, results, fields) {
        if (error)
            throw error;
        res.send("Posted By Id #: " + req.headers.account + "\nPost Details: " + req.headers.details);
        return;
    })
}
module.exports = { feeds_create }