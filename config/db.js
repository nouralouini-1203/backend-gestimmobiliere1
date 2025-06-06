const mongoose = require("mongoose")
const uri = process.env.MONGODB_URL

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error in DB connection: ", error)
    })
