const express = require("express");
require('dotenv').config()
const cors = require("cors")
const {connection}=require("./configs/db")
const {user}=require("./routes/userRoute")
const {protect}=require("./routes/protectRoute")
const {authenticate}=require("./middlewares/authneticate")
const app = express();

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/",user)
app.use(authenticate)
app.use("/",protect)
 

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running on ${process.env.port}`);
})