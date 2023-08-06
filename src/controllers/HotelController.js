import HotelModel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";

export const findAllHotel = async (req, res, next) => {
    const {min, max, limit, ...others} = req.query;
    try {
        const hotels = await HotelModel.find({...others,
            cheapestPrice: {$gt: min || 1, $lt: max ||999}
        }).limit(limit);
        res.status(200).json( hotels );
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

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await HotelModel.countDocuments({type: "hotel"})
        const apartmentCount = await HotelModel.countDocuments({type: "apartment"})
        const resortCount = await HotelModel.countDocuments({type: "resort"})
        const villaCount = await HotelModel.countDocuments({type: "villa"})
        const cabinCount = await HotelModel.countDocuments({type: "cabin"})

        res.status(200).json([
            {type: 'hotel', count: hotelCount},
            {type: 'apartment', count: apartmentCount},
            {type: 'resort', count: resortCount},
            {type: 'villa', count: villaCount},
            {type: 'cabin', count: cabinCount},
        ]);
    } catch (error) {
        next(error);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);
        const listRoom = await Promise.all(hotel.rooms.map(room => {
            return RoomModel.findById(room);
        }))

        res.status(200).json(listRoom)

    } catch (error) {
        next(error);
    }
}
