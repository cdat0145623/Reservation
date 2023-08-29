import express from "express";
const router = express.Router();

import {
    findAllRoom,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    updateRoomAvailability,
} from "../controllers/RoomController.js";
import { verifyAccessToken, verifyAdmin } from "../helpers/jwt_service.js";

router.get("/", findAllRoom);

router.get("/find/:id", getRoom);

router.post("/:hotelId", verifyAccessToken, verifyAdmin, createRoom);

router.put("/:id", verifyAccessToken, verifyAdmin, updateRoom);

router.delete("/:id/:hotelId", verifyAccessToken, verifyAdmin, deleteRoom);

router.put("/availability/:id", updateRoomAvailability);

export default router;
