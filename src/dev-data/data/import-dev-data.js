import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import UserModel from "../../models/UserModel.js";
import HotelModel from "../../models/HotelModel.js";
import connect from "../../helpers/connection_mongodb.js";

connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hotels = JSON.parse(fs.readFileSync(`${__dirname}/hotels.json`, "utf-8"));
// const apartment = JSON.parse(
//     fs.readFileSync(`${__dirname}/apartment.json`, "utf-8")
// );
// const resort = JSON.parse(fs.readFileSync(`${__dirname}/resort.json`, "utf-8"));
// const villa = JSON.parse(fs.readFileSync(`${__dirname}/villa.json`, "utf-8"));
// const cabin = JSON.parse(fs.readFileSync(`${__dirname}/cabin.json`, "utf-8"));

const ImportData = async () => {
    try {
        await HotelModel.create(hotels, { validateBeforeSave: false });
        console.log("Data successful");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

const deleteData = async () => {
    try {
        console.log("Data deleted");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

ImportData();
if (process.argv[2] === "--import") {
    ImportData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}
