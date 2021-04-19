const express = require('express');
const path = require("path");

require('custom-env').env("localhost")

const app = express();


const port = process.env.APP_PORT || 5000;

app.listen(port, ()=> { `SERVER is running on PORT ${port}`});

app.get('/', (req,res) =>{
   res.sendFile(path.join(__dirname,"public","index.html"));
});