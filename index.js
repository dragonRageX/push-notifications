const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const path = require("path");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey = `${process.env.PUBLIC_VAPID_KEY}`;   //used the 'npx web-push generate-vapid-keys' command to generate the VAPID keys
const privateVapidKey = `${process.env.PRIVATE_VAPID_KEY}`;

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

app.post("/subscribe", (req, res) => {   //Subscribe Route
    const pushSubscription = req.body.subscription;   //Get push subscription object
    console.log("Received pushSubscription:", pushSubscription);
    res.status(201).json({});   //send 201 status code - resource created

    const payload = JSON.stringify({ title: "Push Test" });   //create payload

    webpush.sendNotification(pushSubscription, payload).catch((err) => console.log(err));   //pass pushSubscription object into sendNotification
});

app.listen(port, () => console.log(`Server started on port ${port}`));