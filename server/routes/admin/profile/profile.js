var express = require('express');
var router = express.Router();
const UserDB = require('../../../dbClients/userDB');

router.get('/',(req,res)=>{
      callBack=(error,data )=>{
          res.render('admin-profile',{data:data})  
    }
    UserDB.getUserById(req.user._id,callBack);
});

router.post('/',(req,res)=>{
    const query=req.body;   
    const description = {userDetails:query};
    callBack=()=>{
        res.redirect('/')
    }
   UserDB.editProfile(req.user._id,description,true,callBack)
})

router.post('/user/delete',(req,res)=>{
    console.log(req.body.password)
    const validationPassword=req.body.password;
    
    callback=(err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                callback=()=>{
                    console.log("callback")
                    req.logout()
                    res.redirect('/users/login')
                }
                 UserDB.deleteUser(req.user._id,callback)
            } else {
                return console.log("wrong password")
            }
    }
    UserDB.comparePassword(validationPassword,req.user.password, callback);
});

router.post('/user/update/password',(req,res)=>{
    console.log(req.body)
    const oldPassword=req.body.oldpassword;
    const newpassword=req.body.newpassword;
    const confirmPassword=req.body.confirmpassword;

    callback=(err,isMatch)=>{
        if (err) throw err;
        if (isMatch) {
        
            req.checkBody('newpassword', 'Password is required').notEmpty();
            req.checkBody('newpassword', 'Passwords do not match').equals(req.body.confirmpassword);
        
            const errors = req.validationErrors();
        
            if (errors) {
                 req.logout()
                res.render('wrong-password',{ 
                    layout: false ,
                    msg:errors[0].msg
                 })
                
            } else {
                userId=req.user._id;
                sucessCallBack=()=>{
                    console.log("password change")
                    req.logout()
                    res.redirect('/users/login')
                }
                UserDB.updatePassword(userId,req.user.password,newpassword,sucessCallBack);
                
            }
            

         } else {
             req.logout()
            res.render('wrong-password',{ layout: false,msg:"Wrong Password" })
        }
    }
    UserDB.comparePassword(oldPassword,req.user.password,callback);
    
})
 
module.exports = router;