 var connection=require('../../lib/mysql');

function updataInfo(req,res) {
    var data=Object.values(req.body);  //将对象内的值  以数组形式存放
    connection.query('UPDATE info SET title=?,logo=?,url=?,keywords=?,description=?,tel=?,qq=?,email=?,address=?,copyright=? WHERE iid=1',data,function (err,rows,fieds) {
    });
}

function getInfo(callback) {
    connection.query('select * from info where iid=1',function (err,rows,fieds) {
        callback(rows);
    });
}

function getUser(req,res,data,callback) {
    // var str = "";
    // if(Array.isArray(data)){
    //     str = data.join('=');
    // }else{
    //     for(var i in data){
    //         str = i+'='+data[i]
    //     }
    //     /*
    //     * str = Object.keys(data)[0]+'='+Object.values(data)[0]
    //     * */
    // }
    connection.query('select * from user where username=?',data,function (error,rows) {
        if(error){
            rows=[];
        }
        callback(req,res,rows);
    })
}

function changePass(req,res,data) {
    //{user:'admin',pass:123456}
    console.log(data);
    var pass = data.pass;
    var user = data.user;
    connection.query('UPDATE `user` SET `password`=? WHERE `username`=?',[pass,user],function (error) {
       
    });
}

function updateAdv (req,res){

    var data = Object.values(req.body);
    console.log(data)
    connection.query('INSERT INTO `wheel`( `title`, `url`, `img`, `description`, `sort`) VALUES (?,?,?,?,?)',data,function (error) {
        if(error){
            res.redirect('/admin/addadv')
            console.log('插入失败');
        }else{
            res.redirect('/admin/adv')
            console.log('插入成功');
        }
    })
}
function getAdv(req,res,callback){
    connection.query('select * from wheel',function (error,rows) {
        callback(req,res,rows);
    });
}




module.exports.updataInfo=updataInfo;
module.exports.getInfo=getInfo;

module.exports.getUser =getUser;
module.exports.changePass = changePass;

module.exports.updateAdv = updateAdv;
module.exports.getAdv = getAdv;

