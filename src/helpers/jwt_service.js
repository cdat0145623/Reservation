import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import AppError from "../utils/appError.js";
import { createClient } from "redis";
import UserModel from "../models/UserModel.js";

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

export const signAccessToken = (id, isAdmin) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
            isAdmin,
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const tokenOptions = {
            expiresIn: "3h",
        };
        JWT.sign(payload, secret, tokenOptions, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const signRefreshToken = (id, isAdmin) => {
    const token = new Promise((resolve, reject) => {
        const payload = {
            id,
            isAdmin,
        };
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const tokenOptions = {
            expiresIn: "5h",
        };
        JWT.sign(payload, secret, tokenOptions, async (err, token) => {
            if (err) return reject(err);
            return resolve(token);
        });
    });
    token.then((token) => {
        return new Promise(async (resolve) => {
            await client.set(id?.toString(), token, {
                EX: 13000,
            });
            resolve(token);
        });
    });
    return token;
};

export const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, payload) => {
                if (err) {
                    return reject(new AppError(err, 404));
                }
                const refTokenRedis = await client.get(payload?.id);
                const user = await UserModel.findById({
                    _id: payload.id,
                });
                if (!refTokenRedis && !user)
                    return reject(new AppError("Forbidden", 403));
                return resolve(payload);
            }
        );
    });
};

export const deleteToken = async (id) => {
    await client.del(id);
};

export const verifyAccessToken = async (req, res, next) => {
    try {
        let access_token;
        if (
            req?.headers["authorization"] &&
            req?.headers["authorization"]?.startsWith("Bearer")
        ) {
            access_token = req?.headers["authorization"]?.split(" ")[1];
        } else if (req?.cookies?.access_token) {
            access_token = req?.cookies?.access_token;
        }
        // console.log("access_token:::;::::::", access_token);
        if (!access_token) {
            next(new AppError("You are not authenticated", 401));
        }

        JWT.verify(
            access_token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err) return next(new AppError("Token is not valid", 403));
                req.user = user;
            }
        );
        next();
    } catch (err) {
        console.log("Verify access token::::", err);
        next(err);
    }
};

export const verifyUser = async (req, res, next) => {
    if (req?.user?.id === req?.params?.id || req?.user?.isAdmin) {
        next();
    } else {
        return next(new AppError("you are not authorized", 403));
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req?.user?.isAdmin) {
        next();
    } else {
        return next(new AppError("you are not permission", 403));
    }
};
