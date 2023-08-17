import HotelModel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";
import createError from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    try {
        const newRoom = await RoomModel.create(req.body);
        await HotelModel.findByIdAndUpdate(req.params.hotelId, {
            $push: {
                rooms: newRoom._id,
            },
        });
        res.status(200).json(newRoom);
    } catch (err) {
        next(err);
    }
};

export const findAllRoom = async (req, res, next) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await RoomModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true,
            }
        );
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
};

export const deleteRoom = async (req, res, next) => {
    try {
        await RoomModel.findByIdAndDelete(req.params.id);
        await HotelModel.findByIdAndUpdate(req.params.hotelId, {
            $pull: {
                rooms: req.params.id,
            },
        });
        res.status(200).json("Your room has been deleted");
    } catch (error) {
        next(error);
    }
};

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await RoomModel.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDate": req.body.dates,
                },
            }
        );
        res.status(200).json("Room status has been updated");
    } catch (error) {
        next(error);
    }
};
