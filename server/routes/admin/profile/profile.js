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
    UserDB.comparePassword(validationPassword,req.user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            callback=()=>{
                console.log("callback")
                req.logout()
                res.redirect('/users/login')
            }
             UserDB.deleteUser(req.user._id,callback)
        } else {
            return alert("wrong password")
        }
    });
});
 
module.exports = router;