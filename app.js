const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    console.log("Data recieved.");
    // const city = "London";
    const city = req.body.City;
    const appid = "dd054ca089c4737203a9669b78e338e0";
    const units = "metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on('data',function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const icon = weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in "+city+" right now is: "+weatherData.main.temp+" degrees Celsius</h1>");
            res.write("<img src="+imageUrl+">");
            res.end();
        });
    });
});


app.listen(3000,function(){
    console.log("server started on port 3000.");
});