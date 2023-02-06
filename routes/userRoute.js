const { Router } = require("express");
const { UserModel } = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const fs = require("fs")

const user = Router();


user.post("/signup", async (req, res) => {
    try {
        let { name, pass, email, role } = req.body;
        bcrypt.hash(pass, 5, async (err, hash) => {
            let data = new UserModel({ name, pass: hash, email, role })
            await data.save()
            res.send("Registraion success")
        });
    } catch (error) {
        console.log(error);
    }
})


user.post("/login", async (req, res) => {
    try {
        let { name, pass } = req.body;
        let data = await UserModel.find({name});
        let hashed_pass = data[0].pass
        if (data.length > 0) {
            bcrypt.compare(pass, hashed_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: data[0]._id, role:data[0].role }, "masai",{ expiresIn: 6000 });
                    const refresh_token = jwt.sign({ userID: data[0]._id }, "newmasai",{ expiresIn: 30000 })
                    res.send({ "message": "Login Successfully", "token": token, "refreshtoken":refresh_token })
                } else {
                    res.send("Wrong Information")
                }
            });
        } else {
            res.send("Wrong Information")
        }
    } catch (error) {
        res.send("Please Register First")
        console.log(error);
    }
})

user.get("/logout", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"));
    blacklisteddata.push(token);
    fs.writeFileSync("./blacklist.json", JSON.stringify(blacklisteddata))
    res.send("Logout Successfull")
})


module.exports={user}