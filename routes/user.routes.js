const router = require("express").Router();
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary.config")

//get home page

router.get("/edit-myUser", (req, res,next)=> {
//sacar al current user del request que fue almacenado gracias al express- session

const{user} = req.session
console.log("lo qe mando",user)
res.render("user/edit-user",user);

})

router.post('/edit-myUser',fileUploader.single('profile_pic'),(req, res, next)=>{

let profile_pic;
if(req.file){
    profile_pic = req.file.path
}



    console.log("req.file",req.file)
    const {role,...restUser} = req.body;
    const {user} = req.session
    //model.findByidandUpdate

User.findByIdAndUpdate(user._id,{...restUser, profile_pic:req.file.path},{new:true})
.then(updatedUser =>{
    req.session.user = updatedUser // sobreescribir el user current req session para actualizar el usuario en los request
res.redirect("/user/my-profile")
})
.catch((err) => {
    next(err);
})

})


router.get("/my-profile", (req, res, next) => {
    //sacar al current user del request que fue almacenado gracias a express-session
    const {user} = req.session
  res.render("user/profile",user);
});


module.exports = router;