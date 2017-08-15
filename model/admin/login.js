var connection=require('../../lib/mysql');

function getUser(req,res,callback) {
    connection.query('select * from user',function (err,rows,fieds) {
        callback(rows);
    });
}
module.exports.getUser=getUser;