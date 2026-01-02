import express from "express";
import https from "https";
const app = express();

app.get("/", function(req, res){
    res.send("Server is up and running"); 
})

app.listen(3000, function(){
    console.log("The server is running on port 3000.");
});