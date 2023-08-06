import UserModel from "../models/UserModel.js";
import createError from "../utils/error.js";
import { signAccessToken } from "../helpers/jwt_service.js";
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return next(
                createError(401, "username, email, password have to exist")
            );

        const isUser = await UserModel.findOne({ username });
        const isEmail = await UserModel.findOne({ email });

        if (isUser || isEmail)
            return next(createError(409, `${username} or ${email} is exist`));

        const newUser = await User.create({
            username,
            email,
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
        console.log(user)
        if (!user) return next(createError(404, "User not found!"));
        const isValid = await user.checkPassword(req.body.password);

        if (!isValid) return next(createError(401, "Password is incorrect!"));

        const token = await signAccessToken(user._id, user.isAdmin);

        const { password, isAdmin, ...others } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(others);
    } catch (error) {
        next(error);
    }
};
