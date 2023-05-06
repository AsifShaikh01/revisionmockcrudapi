const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,"masai");
            req.userId = user.id;
        }else{
            res.send("UnAuthorised user")
        }
        next();
        
    } catch (error) {
        res.send("UnAuthorised user")
    }
}

module.exports = {
    auth
}