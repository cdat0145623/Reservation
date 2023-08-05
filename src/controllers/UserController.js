import UserModel from "../models/UserModel.js";

export const findAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true,
            }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Your account has been deleted");
    } catch (error) {
        next(error);
    }
};
