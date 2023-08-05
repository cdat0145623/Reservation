import express from "express";
import dotenv from "dotenv";
import connect from "./src/helpers/connection_mongodb.js";
import hotelRoute from "./src/routes/HotelsRoute.js";
import authRoute from "./src/routes/AuthRoute.js";
import userRoute from "./src/routes/UsersRoute.js";
import roomRoute from "./src/routes/RoomsRoute.js";

import cookieParser from "cookie-parser";

dotenv.config();
// '
const app = express();

connect();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);

app.use((err, req, res, next) => {
    console.log("hello this is the middleware");
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
