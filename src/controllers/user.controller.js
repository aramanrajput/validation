const express = require("express")
const transporter = require("../configs/mail")
const router = express.Router()
const app = express()


const User = require("../models/user.model")


const to_array = [
    "b@b.com",
    "c@c.com",
    "d@d.com",
    "e@e.com",
    "f@f.com",
]

const to_string = to_array.join(",")

app.use(express.json())


router.post("/", async (req,res)=>{
    try{
       
        const user = await User.create(req.body)

       
        var message = {
            from: "a@a.com",
            to: req.body.email,
            subject: `welcome to ABC system ${user.first_name} ${user.last_name}`,
            text:  `hi ${user.first_name} please confirm you email adress`,
            html: `<h1>hi ${user.first_name} please confirm you email adress</h1>`
          };

          transporter.sendMail(message)
        var message2 = {
            from:"a@a.com",
            to:to_string,
            subject:`${user.first_name} ${user.last_name} registered with us`,
            text:`Please welcome ${user.first_name} ${user.last_name}`,
            html:`<h1>Please welcome ${user.first_name} ${user.last_name}</h1>`
        }
transporter.sendMail(message2)

        res.status(201).send(user)

      
    }
    catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

// An endpoint to get the paginated users should be available

router.get("/",async(req,res)=>{

    try{
        let page = +req.query.page||1
        let size = +req.query.size||3
        let skip = (page-1)*size
    
        const users = await User.find().skip(skip).limit(size).lean().exec()

        const total = Math.ceil((await User.find().countDocuments())/size)
    
        return res.send({users,total})  
    }
    catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }


    
})

module.exports = router


