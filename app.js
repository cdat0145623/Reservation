import express from "express";
import cors from "cors";
import authRoute from "./src/routes/AuthRoute.js";
import userRoute from "./src/routes/UsersRoute.js";
import roomRoute from "./src/routes/RoomsRoute.js";
import hotelRoute from "./src/routes/HotelsRoute.js";
import handleError from "./src/controllers/ErrorController.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

//Convert path dirname from commonjs to module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: true,
    credentials: true,
};

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);

app.use(handleError);

export default app;
