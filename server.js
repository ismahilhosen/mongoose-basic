require('dotenv').config();
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;
const app = require("./app");
mongoose.connect(process.env.DATABASE).then(()=>{

    console.log("database conncet succussfull")
});


app.listen(port, ()=>{
    console.log(`app is runing on port ${port}`)
})