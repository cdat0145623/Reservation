import express from "express";
const router = express.Router();

import {
    findAllRoom,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
} from "../controllers/RoomController.js";
import { verifyAdmin } from "../helpers/jwt_service.js";

router.get("/", findAllRoom);

router.get("/find/:id", getRoom);

router.post("/:hotelId", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export default router;
