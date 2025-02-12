const adminAuth = (req,res,next)=>{
    const token = "xyzfhks";
    const isAdminAuthorized = token ==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized request");
    }
    else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token = "abc";
    const isAdminAuthorized = token ==="abc"
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized request");
    }
    else{
        next();
    }

}
module.exports ={
    adminAuth,
    userAuth
}