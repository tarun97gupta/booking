import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'

//Inside controllers, we use different MONGODB functions/actions and then perform what action is to be taken on DB.

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    try {
        await Room.findByIdAndDelete(req.params.id)
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        res.status(200).json("Room has been Deleted")
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}