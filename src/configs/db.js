const mongoose = require("mongoose")

var connect = ()=>{
    return  mongoose.connect("mongodb://127.0.0.1:27017/validation")
}

module.exports = connect