const express = require("express");

const PORT = 5000;
const app = express();

app.get('/', async(req, res)=>{
    res.json({
        messege: "hello"
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is listening to ${PORT}`);
});