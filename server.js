const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({path : './.env'})

const PORT = process.env.PORT || 5500; 

const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_APIKEY, process.env.PINATA_SECRETKEY);

const readableStreamForFile = fs.createReadStream('./spiderman.png');
const options = {
    pinataMetadata: {
        name: 'Spiderman',
        keyvalues: {
           description : ""
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

app.post("/uploadFile",(req,res)=> {
    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(PORT,()=>{
    console.log("Server is connected...");
})