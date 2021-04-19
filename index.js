const express = require('express');
const path = require("path");
const members = require("./Members");
require('custom-env').env("localhost")
const logger = require('./middleware/Logger')

const app = express();


const port = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logger);
app.listen(port, ()=> { `SERVER is running on PORT ${port}`});

// app.get('/', (req,res) =>{
//    res.sendFile(path.join(__dirname,"public","index.html"));
// });
// SET STATIC FOLDER

app.use(express.static(path.join(__dirname,'public')));


app.use('/api/members',require('./routes/api/members'));



// Middleware

