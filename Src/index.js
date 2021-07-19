const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const { get } = require('https');
const os = require('os');
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object


// express app
app=express();
// error handler
app.use(function(err,req,res,next){
    res.status(err.status||500);
    res.render('error',{
        message:err.message,
        error:err
    });
    }
);
// start server
app.listen(3000);
console.log('server start');




// function to get IP address
function getIP() {
    let ip = '';
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                ip = net.address;
                break;
            }
        }
    }
    return ip;
}





// app to get IP addresses
app.get('/',function(req,res){
    var ip = getIP();
});


