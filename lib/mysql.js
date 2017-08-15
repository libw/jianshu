var mysql=require('mysql');
var config=require('../config/config');
var connection=mysql.createConnection(config);

connection.connect(function (err) {
    if(err){
        console.log('[query]-:'+err);
        return;
    }
    console.log('connection success');
});

module.exports=connection;