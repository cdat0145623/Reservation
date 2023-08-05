import HotelModel from "../models/HotelModel.js";

export const findAllHotel = async (req, res, next) => {
    try {
        const hotels = await HotelModel.find();
        res.status(200).json({ hotels });
    } catch (error) {
        next(error);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
};

export const createHotel = async (req, res, next) => {
    try {
        const newHotel = await HotelModel.create(req.body);
        res.status(200).json(newHotel);
    } catch (error) {
        next(error);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await HotelModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true,
            }
        );
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        await HotelModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Your hotel has been deleted");
    } catch (error) {
        next(error);
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    console.log(cities);
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return HotelModel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};
