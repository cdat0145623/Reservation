import express from "express";
import {
    findAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/UserController.js";
import { refreshToken } from "../controllers/AuthController.js";
import { verifyUser, verifyAdmin } from "../helpers/jwt_service.js";
const router = express.Router();

router.get("/refreshToken", refreshToken);

router.get("/", verifyAdmin, findAllUsers);

router.get("/:id", verifyUser, getUser);

router.post("/", verifyUser, createUser);

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

export default router;
