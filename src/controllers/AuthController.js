import UserModel from "../models/UserModel.js";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteToken,
} from "../helpers/jwt_service.js";
import AppError from "../utils/appError.js";

export const register = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!req.body.username || !req.body.email || !password)
            return next(
                new AppError("username, email, password have to exist", 401)
            );

        const isUser = await UserModel.findOne({ username: req.body.username });
        const isEmail = await UserModel.findOne({ email: req.body.email });
        if (isUser || isEmail)
            return next(
                new AppError(
                    `${req.body.username} or ${req.body.email} is exist`,
                    409
                )
            );
        const newUser = await UserModel.create({
            ...req.body,
            password,
        });

        newUser.password = undefined;
        newUser.isAdmin = undefined;

        res.status(200).json({ newUser });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });

        if (!user) return next(new AppError("User not found!", 404));
        const isValid = await user.checkPassword(req.body.password);

        if (!isValid) return next(new AppError("Password is incorrect!", 401));

        const access_token = await signAccessToken(user._id, user.isAdmin);

        const refresh_token = await signRefreshToken(user._id, user.isAdmin);

        const { password, isAdmin, ...others } = user._doc;

        res.cookie("access_token", access_token, {
            httpOnly: false,
            sameSite: "None",
            secure: true,
            expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
        });
        res.cookie("refresh_token", refresh_token, {
            httpOnly: false,
            sameSite: "None",
            secure: true,
            expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
        })
            .status(200)
            .json({ access_token });
    } catch (error) {
        next(new AppError(error));
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refresh_token) {
            console.log("Khong ton tai refresh token::::>>>");
            return next(new AppError("Session is not valid", 403));
        }

        const user = await verifyRefreshToken(cookies?.refresh_token);

        const access_token = await signAccessToken(user.id, user.isAdmin);
        const refresh_token = await signRefreshToken(user.id, user.isAdmin);

        res.status(200).json({
            access_token,
            refresh_token,
        });
    } catch (error) {
        next(new AppError("jwt expired", 404));
    }
};

export const logout = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refresh_token)
            return next(new AppError("You are not authenticated", 404));

        const { id } = await verifyRefreshToken(cookies?.refresh_token);
        if (id) {
            await deleteToken(id);
            res.clearCookie("access_token", {
                httpOnly: false,
                sameSite: "None",
                secure: true,
            });
            res.clearCookie("refresh_token", {
                httpOnly: false,
                sameSite: "None",
                secure: true,
            });
        }
        res.status(200).json({ message: "success" });
    } catch (error) {
        next(error);
    }
};
