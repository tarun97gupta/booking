import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from "../controllers/hotel.js"
import Hotel from "../models/Hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

//Specific route provide various controller based actions such as post,get,put and delete methods.

const router = express.Router()

//Create

router.post("/", verifyAdmin, createHotel)

//Update

router.put("/:id", verifyAdmin,updateHotel)

//Delete

router.delete("/:id", verifyAdmin, deleteHotel )

//Get

router.get("/find/:id", getHotel)

//GetAll

router.get("/",getAllHotels)

router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)


export default router