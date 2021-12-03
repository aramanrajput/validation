const express = require("express")

const{body,validationResult}=require("express-validator")

const router = express.Router()
const app = express()


const User = require("../models/user.model")



app.use(express.json())


router.post("/",body("first_name").notEmpty().withMessage("first name is required"),
body("last_name").notEmpty().withMessage("last name is required"),
body("email").notEmpty().custom((value)=>{
    const isEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)

        if(!isEmail||value <=0){
            throw Error("Please enter proper email adress")
        }
      return true
}),
body("pincode").isLength({min:6,max:6}).withMessage("pincode should be exactly 6 numbers"),
body("age").notEmpty().custom((value)=>{
    if(!(value>=1&&value<=100)){
        throw Error("age should be number between 1-100")
    }
    return true
}),
body("gender").notEmpty().custom((value)=>{
    if(!(value=="Male"||value=="Female"||value=="Others")){
        throw Error("gender should be Male,Female or Others")
    }
    return true
})
 ,async (req,res)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    let newErrors = errors.array().map(err=>err.msg)
    return res.status(400).json({errors:newErrors})
}

    try{
       
        const user = await User.create(req.body)

   
        res.status(201).send(user)

      
    }
    catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})




module.exports = router


