var connection = require('../../libs/mysql');

function getInfo(req,res,callback){
    connection.query('select * from site where sid=1',function (error,rows) {
        callback(req,res,rows);
    })
}

function updateInfo(req,res){

    var data =Object.values(req.body);
    console.log(connection.query('UPDATE `site` SET `title`=?,`logo`=?,`host`=?,`keyword`=?,`description`=?,`tell`=?,`qq`=?,`email`=?,`address`=?,`copy`=? WHERE sid=1',data,function (error) {
            if(!error){
                // req.flash('sucess','修改成功');
                res.redirect('/admin/info');
            }else{
                // req.flash('error','修改失败');
            }
    }) )
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
    connection.query('select * from admin where username=?',data,function (error,rows) {
        if(error){
            rows=[];
        }
        callback(req,res,rows);
    })
}

function changePass(req,res,data,callback) {
    //{user:'admin',pass:123213213}
    var pass = data.pass;
    var user = data.user;
    connection.query('update admin set password=? where username=?',[pass,user],function (error) {
       // if(error){
       //     req.flash('error','修改失败');
       // }else{
       //     req.flash('success','修改成功');
       // }
    });
}

function updateAdv (req,res){
    var data = Object.values(req.body);
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
function delAdv(req,res){
    connection.query('delete from wheel where wid=?',[req.body.wid],function (error) {
        console.log('deladv',error)
        if(!error){
            res.send({url:'/admin/adv'});
        }
    })
}

function updataAdv(req,res){
    //[title,url,img,desc,sort,wid]

    connection.query('UPDATE `wheel` SET `title`=?,`url`=?,`img`=?,`description`=?,`sort`=? WHERE wid=?',Object.values(req.body),function (error) {
        console.log('deladv',error)
        if(!error){
            res.redirect('/admin/adv');
        }
    })
}

/*
* 栏目管理
* */
//添加栏目
function addcate(req,res) {
    connection.query("insert into category (title,entitle,description,sort)values(?,?,?,?)",Object.values(req.body),function (error) {
        if(!error){
            res.redirect('/admin/category');
        }else{
            res.redirect('back');
        }
    })
}
function getcate(req,res,callback){
    connection.query('select * from category',function (error,rows) {
        callback(req,res,rows)
    })
}

function delcate(req,res){
    connection.query('delete from category where cid=?',[req.body.cid],function (error) {
        if(error){
            res.send('fail');
        }else{
            res.send('success');
        }
    })
}

function getcateid(req,res,callback){
    connection.query('select * from category where cid=?',[req.params.cid],function (error,rows) {
        callback(req,res,rows);
    })
}

function updatecate(req,res){
    connection.query('UPDATE `category` SET `title`=?,`entitle`=?,`description`=?,`sort`=? WHERE cid=?',Object.values(req.body),function (error) {
        if(error){
            res.redirect('/admin/cateedit/'+req.body.cid)
        }else{
            res.redirect('/admin/category');
        }
    })
}

module.exports.updateInfo = updateInfo;
module.exports.getInfo = getInfo;

module.exports.getUser =getUser;
module.exports.changePass = changePass;

module.exports.updateAdv = updateAdv;
module.exports.getAdv = getAdv;
module.exports.delAdv = delAdv;
module.exports.updataAdv = updataAdv;

module.exports.addcate = addcate;
module.exports.getcate = getcate;
module.exports.delcate = delcate;
module.exports.getcateid = getcateid;
module.exports.updatecate = updatecate;

