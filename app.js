import express from "express";
import https from "https";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", async function (req, res) {
    const query = req.body.cityName;
    const apikey = "292fbcd9d9bffa0a97ff28d8a8c8444f";
    const unit = "metric";
    
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url, function (response) {
        let data = "";

        response.on("data", function (chunk) {
            data += chunk;
        });

        response.on("end", function () {
            const weatherData = JSON.parse(data);

            if (response.statusCode !== 200) {
                res.send("City not found");
                return;
            }

            const temp = weatherData.main.temp;
            const info = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write("<p>The Weather is currently " + info + "</p>");
            res.write("<h1>The Temprature in " + query + " is " + temp + " degree celsius.</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
            console.log(req.body);
            
        });
    });
});

app.listen(4000, function () {
    console.log("The server is running on port 4000.");
});
