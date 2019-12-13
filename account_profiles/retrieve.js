const connection =require('../system/db_connection')

const retrieve = (req, res) => {
    let file = __dirname + '/public/images/' + req.params.filename;
    res.sendFile(file);
}

module.exports = {retrieve}