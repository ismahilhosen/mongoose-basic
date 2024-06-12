const express = require("express");
const app = express();
const cors = require("cors");
const { Router } = require("./routes/productRoute");

//middelwere

app.use(express.json());
app.use(cors())

const productRoute = Router;


//default route 
app.get("/", (req, res)=>{
    res.send("server is runing")
})

//post data in mongoose | insert
app.use("/api/v1/product", productRoute)




module.exports = app;

