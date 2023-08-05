import express from "express";
import {
    findAllHotel,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    countByCity,
} from "../controllers/HotelController.js";
import { verifyAdmin } from "../helpers/jwt_service.js";
const router = express.Router();

router.get("/", findAllHotel);

router.get("/find/:id", getHotel);

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);

export default router;
