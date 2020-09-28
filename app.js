const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendgrid = require("@sendgrid/mail");

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); 
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/backend", (request, response, next) => {
    response.send("It's working")
});

app.post("/backend", (request, response, next) => {

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
        to: "remmersfreetrials@gmail.com",
        from: "remmersfreetrials@gmail.com",
        subject: "Website Contact",
        text: request.body.message
    }


    sendgrid.send(message)
        .then(result => {

            response.status(200).json({
                success: true
            });

        })
        .catch(error => {

            console.log('error: ', error);
            response.status(401).json({
                success: false
            });

        });
});

app.listen(2000)