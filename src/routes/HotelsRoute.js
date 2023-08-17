import express from "express";
import {
    findAllHotel,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    countByCity,
    countByType,
    getHotelRooms,
} from "../controllers/HotelController.js";
import { verifyAdmin } from "../helpers/jwt_service.js";
const router = express.Router();

router.get("/", findAllHotel);

router.get("/find/:id", getHotel);

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);

export default router;
