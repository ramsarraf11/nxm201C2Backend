const jwt = require("jsonwebtoken");
const fs = require("fs")
require("dotenv").config()
const authenticate = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        const blacklistdata = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
        if(blacklistdata.includes(token)){
            return res.send("Please Login Again")
        }
        jwt.verify(token, "masai", (err, decoded)=> {
            if(err){
                res.send(err)
            }
            const userrole = decoded.role
            req.body.userrole=userrole
            const userID=decoded.userID
            req.body.userID=userID
            next()
        });
    }else{
        res.send("Please Login")
    }
}

module.exports={authenticate}