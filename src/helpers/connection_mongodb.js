import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
    try {
        console.log("connecting...");
        mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(console.log("Connected to mongoDB::"));
    } catch (err) {
        console.log(err);
    }
}

export default connect;
