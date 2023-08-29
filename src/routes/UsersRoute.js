import express from "express";
import {
    findAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/UserController.js";
import { refreshToken } from "../controllers/AuthController.js";
import {
    verifyAccessToken,
    verifyUser,
    verifyAdmin,
} from "../helpers/jwt_service.js";
const router = express.Router();

router.get("/refreshToken", refreshToken);

router.get("/", verifyAccessToken, verifyAdmin, findAllUsers);

router.get("/:id", verifyAccessToken, verifyUser, getUser);

router.post("/", verifyAccessToken, verifyUser, createUser);

router.put("/:id", verifyAccessToken, verifyUser, updateUser);

router.delete("/:id", verifyAccessToken, verifyUser, deleteUser);

export default router;
