const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {db} = require("./db")
const app = express();

require("dotenv").config()
const PORT = process.env.PORT

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

var corsOptions={
    origin:"http://localhost:3000"
}

const server = ()=>{
    db()
    app.listen(PORT,()=>{
        console.log("Listening to port",PORT);
    })
    app.on('error',console.error.bind(console,"MongoDB connection error"))
}

app.get('/',(req,res)=>{
    res.json({message:"Welcome to world-wide employee management"})
})

server() 