const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb://LakshmiKrishna:lakshmikrishna@ac-hpvbi7o-shard-00-00.fgcxtxc.mongodb.net:27017,ac-hpvbi7o-shard-00-01.fgcxtxc.mongodb.net:27017,ac-hpvbi7o-shard-00-02.fgcxtxc.mongodb.net:27017/campdb?ssl=true&replicaSet=atlas-14be5c-shard-0&authSource=admin&appName=Cluster0"
)
    .then(() => {
        console.log("MongoDB Connected");

    })

    .catch((err) => {
        console.log(err);
    });


const course = mongoose.model("CampRegistration", new mongoose.Schema(
    {
        registrationId: String,
        participantId: String,
        campBatch: String,
        campStartdate: String,
        campEnddate: String,
        preferredSession: String,
        Accommodation: String,
        MealPreference: String,
        tshirtSize: String,
        paymentStatus: String
    }
))
app.post("/add-campregistration", async (request, response) => {
    await course.create(request.body)
    response.json({ "status": "success" })
})
app.post("/view-campregistration", async (request, response) => {
    const data = await course.find();
    response.json(data);
});


app.listen(3000, () => {
    console.log("Server Started")
})