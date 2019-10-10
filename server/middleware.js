module.exports = {
  isLoggedIn : function(req,res,next){
    // console.log(req.user, req.headers.cookie, "req user check");
    if(!req.user){
      return res.status(400).send({message: "login to get user info"});
    }

    next();
  }
}