const express = require('express');
const app= express();
const cors = require('cors');
app.use(cors());
const dbConnect = require('./mongodb');
app.use(express.json());

app.use((req,resp,next)=>{
    resp.header("Access-Control-Allow-Origin","*");
    resp.header(
        "Access-Control-Allow-Headers",
        "GET, POST,PUT, DELETE,OPTIONS,HEAD"
    );
    resp.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept, Authorization"
    );
    next(); 
})


app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayUser"));
app.use('/api', require("./Routes/DetailView"));


app.listen(5000);
