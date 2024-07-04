require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3000
const path = require("path")
const eventRouter = require("./router/ToDo")
const indexRouter = require("./router/main.js")

const mongoose = require("mongoose");

app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

app.use("/event", eventRouter)
app.use("/", indexRouter)

const mongoUrl = process.env.MONGO_HOST ?
    `mongodb://${process.env.MONGO_HOST}:27017/todos` :
    process.env.MONGODB_URL

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });

app.listen(PORT, () => {
    console.clear()
    console.log("Listening on PORT", PORT)
})