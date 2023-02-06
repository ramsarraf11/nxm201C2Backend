const {Router}=require("express")
const {authorise}=require("../middlewares/authorise")

const protect = Router()


protect.get("/goldrate",authorise(["customer","manager"]),(req,res)=>{
    res.send("Gold Rates are here")
})


protect.get("/userstats",authorise(["manager"]),(req,res)=>{
    res.send("User details are displayed")
})


module.exports={protect}