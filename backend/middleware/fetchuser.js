const jwt = require("jsonwebtoken");


const JWT_SECRET = "vaibhavisgoodbo3y";
const fetchuser = (req,res,next)=>{
    const token= req.header("auth-token");
    if(!token)
    {
        res.status(401).send("please authenciate using valid token ")
    }
    try {
        const data =jwt.verify(token,JWT_SECRET);
        req.user=data.user;
    
        next();
        
    } catch (error) {
        console.log(error.message);
        res.status(401).send("please authenciate using valid token ")
      }

   

}

module.exports =fetchuser;