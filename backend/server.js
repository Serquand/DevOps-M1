const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const todos = require('./routes/todos.routes');

const port = 3001;

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/todos`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/todos", todos);

    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
}