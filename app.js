const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {   
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/Lists/4c7080755e";

  const option = {
    method: "POST",
    auth: "arshad:2b540ae29f4007cb726f40750c1f8cf4-us10",
  };
  const request = https.request(url, option, function (response) {

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

// app.listen(3000, function () {
//   console.log("Server is running on port 3000");
// });

//for deploying on heroku we have to change the port name
// process.env.PORT is a dynamic port

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

//api key
// 2b540ae29f4007cb726f40750c1f8cf4-us10  //usX

//list id
// 4c7080755e
