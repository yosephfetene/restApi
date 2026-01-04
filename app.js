import express from "express";
import https from "https";

const app = express();

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=d1ddb2692818c1e61db3de8a7f683383&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode); 

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const info = weatherData.weather[0].description;
            console.log(info);
        });
    });

    res.send("Server is up and running");
});

app.listen(3000, function () {
    console.log("The server is running on port 3000.");
});
