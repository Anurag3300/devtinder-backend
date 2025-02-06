const express = require("express");
const app = express();// creating new expressJS application
//create a new webserver
app.use("/",(req,res)=>{
    res.send("Namaste Anurag!");
})
app.use("/hello",(req,res)=>{
    res.send("Hello hello hello");
})
app.use("/test",(req,res)=>{
    res.send("Hello from the server");
})

app.listen(3000,()=>{console.log("the server is listen all the request at 3000 port")});// our server is listen on port no 3000;