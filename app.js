//jshint esversion: 6
const express=require('express');
const bodyParser=require('body-parser');
const https=require("https");
const { response } = require('express');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use("/CSS",express.static(__dirname+"/CSS"));
app.use("/Images",express.static(__dirname+"/Images"));

app.listen(3000,function(){console.log("Server is Running");});

app.get("/", function(req,res){
    res.sendFile(__dirname+"/HTML/index.html");
});

app.post("/",function(req,res){
    var data = {
        members: [
            {
                email_address: req.body.Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.Name,
                }
            }
        ]
    };
    var stringData=JSON.stringify(data);

    var url='https://us21.api.mailchimp.com/3.0/lists/af1194c616' ;
    const options={
        method: "POST",
        auth: "Saransh:92b64b4edb704f90e9295b611063d812-us21"
    };
   
   const mailChimpReq= https.request(url, options, function(response){
    var statusCode=response.statusCode;
            if(statusCode===200){
                res.sendFile(__dirname+"/HTML/success.html");
            }
            else{
                res.sendFile(__dirname+"/HTML/failure.html");
            }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    mailChimpReq.write(stringData);
    mailChimpReq.end();
    
    
    
});

//92b64b4edb704f90e9295b611063d812-us21
//af1194c616
//url: https://us21.mailchimp.com/account/92b64b4edb704f90e9295b611063d812-us21