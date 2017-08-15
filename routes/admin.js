var express = require('express');
var router = express.Router();
var path= require('path');
var fs = require('fs');
var adminmodel=require('../model/admin/admin');
var multer = require('multer');
var uploadDir= path.resolve(__dirname,'../uploads/');
var upload = multer({ dest: uploadDir});
router.use(function (req,res,next) {
    // if(req.session.adminIsLogin){
    //     next();
    // }else{
    //     res.redirect('/adminlogin');
    // }
    next();
});

//删除session
// router.get('/del',function(req,res){
//     console.log(555555);
//     req.session.destroy('isLogin');
//     res.redirect('/admin');
// });
router.use(function (req,res,next) {
    if(req.session.isLogin){
        next();
    }else{
        res.redirect('/adminlogin');
    }
});
/* GET admin home page. */
router.get('/', function(req, res) {
    res.render('admin/index');
});


router.route('/info').get(function (req,res) {
   
    adminmodel.getInfo(function (data) {
        res.render('admin/info',data[0]);
    });
}).post(function (req,res) {
    adminmodel.updataInfo(req,res);
    res.redirect('/admin/info');
});

//处理上传图片问题
router.post('/uploadlogo',upload.single('logo'),function (req,res) {
    var date = new Date();
    var dirName = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
    var targetUploadDir = path.join(uploadDir,dirName);
    if(!fs.existsSync(targetUploadDir)){
        fs.mkdir(targetUploadDir);
    }
    var filename = (+new Date())+path.extname(req.file.originalname);
    var rs = fs.createReadStream(req.file.path);
    var ws = fs.createWriteStream(path.join(targetUploadDir,filename));
    // 2017-7-5/21313123123.png
    rs.pipe(ws);
    var logoPath = '/'+dirName+'/'+filename;
    res.send(logoPath);
});


router.get('/add',function (req,res) {
    res.render('admin/add');
});


router.route('/adv').get(function (req,res) {
    adminModel.getAdv(req,res,function (req,res,data) {
        console.log(data);
        res.render('admin/adv',{data:data});
    })
});

router.route('/addadv').get(function (req,res) {
    res.render('admin/addadv');
}).post(function (req,res) {
    adminModel.updateAdv(req,res);
});


router.get('/book',function (req,res) {
    res.render('admin/book');
});
router.get('/cate',function (req,res) {
    res.render('admin/cate');
});
router.get('/cateedit',function (req,res) {
    res.render('admin/cateedit');
});
router.get('/column',function (req,res) {
    res.render('admin/column');
});
router.get('/list',function (req,res) {
    res.render('admin/list');
});
router.get('/page',function (req,res) {
    res.render('admin/page');
});


//改密码
router.route('/pass').get(function (req,res) {
    res.render('admin/pass',{user:req.session.adminUser});
}).post(function (req,res) {
    // console.log(req);
    adminmodel.getUser(req,res,[req.body.user],function (req,res,rows) {
        // console.log(rows);
        //console.log(req.body.oldpass);
        // console.log(rows[0].password);
        if(rows[0].password==req.body.oldpass){
            adminmodel.changePass(req,res,{
                user:req.body.user,
                pass:req.body.newpass
            })
        }else{
            // req.flash('error','旧密码错误');
        }
    });
});



router.get('/tips',function (req,res) {
    res.render('admin/tips');
});
module.exports = router;
