const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendgrid = require("@sendgrid/mail");

const app = express();
app.use(cors());
app.use(bodyParser.json())