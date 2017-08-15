var express = require('express');
var router = express.Router();
var loginmodel=require('../model/admin/login');

router.get('/',function (req,res,next) {
    res.render('admin/login');
});

router.post("/",function (req,res) {
    loginmodel.getUser(req,res,function (data) {
        if(req.body.user==data[0].username){
            if(req.body.pwd==data[0].password){
                req.session.isLogin=true;
                req.session.adminUser = data[0].username;
                res.redirect('/admin');
            }else{
                res.send('密码不正确');
                console.log('密码不正确');
            }
        }else{
            res.send('用户不存在');
            console.log('用户不存在');
        }
    });
   
});


module.exports = router;