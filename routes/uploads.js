var express = require('express');
var router = express.Router();
var path=require('path');
var fs=require('fs');
var multer  = require('multer');
var uploadpath=path.resolve(__dirname,'../uploads/');
var upload = multer({ dest: uploadpath});


router.post('/',upload.single('filex'),function (req,res) {
    var date=new Date();
    var fulldate=[date.getFullYear(),date.getMonth(),date.getDate()].join('-');
    var filedir=path.join(uploadpath,fulldate);
    if(!fs.existsSync(filedir)){
            fs.mkdir(filedir);
    }
    var ext=date.getTime()+path.extname(req.file.originalname);
    var rs=fs.createReadStream(req.file.path);
    var ws=fs.createWriteStream(path.resolve(filedir,ext));
    rs.pipe(ws);
    var showurl=path.join(path.sep+fulldate,ext);
    res.send(showurl);
});

module.exports=router;