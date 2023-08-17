import connect from "./src/helpers/connection_mongodb.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

connect();

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
