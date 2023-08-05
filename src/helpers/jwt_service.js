import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import createError from "../utils/error.js";

export const signAccessToken = (id, isAdmin) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
            isAdmin,
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const tokenOptions = {
            expiresIn: "10h",
        };
        JWT.sign(payload, secret, tokenOptions, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const verifyAccessToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated"));
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyAccessToken(req, res, next, () => {
        console.log(req.user);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "you are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyAccessToken(req, res, next, () => {
        console.log(req.user);
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "you are not permission"));
        }
    });
};
