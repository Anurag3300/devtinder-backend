const express = require("express");
const { adminAuth, userAuth } =require("./middlewares/auth")
const app = express(); // creating new expressJS application
//create a new webserver

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Anurag", lastName: "Pandey" });
// });
// app.post("/user", (req, res) => {
//   res.send("your Data is Save Successfully to the Database!");
// });
// app.put("/user", (req, res) => {
//     res.send("PUT is used to replace an entire resource")
// });
// app.patch("/user",(req,res)=>{
//     res.send("PATCH is used to update a part of a resource")
// })
// app.delete("/user",(req,res)=>{
//     res.send("you have delete the resource successfully")
// })
// app.use("/hello", (req, res) => {
//   res.send("Hello hello hello");
// });
// // this will match all the HTTP method API call to /test
// app.use("/test", (req, res) => {
//   res.send("Hello from the server");
// });
// app.use("/", (req, res) => {
//   res.send("Namaste Anurag!");
// });
// if our Request Handler is empty then the api is hange after some time it timeout and it does not response any thing
// in one route we have multiply route handler 
// app.use("/user",(req,res,next)=>{
//   console.log("Handling the route");
//   next();
//   res.send("Response !!");
// },(req,res)=>{
//   console.log("Handling the route user 2");
//   res.send("2nd Response !!");
// }
// );

app.use("/Admin",adminAuth);

app.get("/Admin/getAllData",(req,res)=>{
  res.send("Get data send");
})
app.get("/Admin/deleteAllData",(req,res)=>{
  res.send("Delete all Data");
})
app.get("/user",userAuth,(req,res)=>{
  res.send("user data Send");
})
app.listen(3000, () => {
  console.log("the server is listen all the request at 3000 port");
}); // our server is listen on port no 3000;
