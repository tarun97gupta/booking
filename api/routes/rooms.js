import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js"

//Specific route provide various controller based actions such as post,get,put and delete methods.

const router = express.Router()

//Create

router.post("/:hotelid", verifyAdmin, createRoom)

//Update

router.put("/:id", verifyAdmin,updateRoom)
router.put("/availability/:id",updateRoomAvailability)

//Delete

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom )

//Get

router.get("/:id", getRoom)

//GetAll

router.get("/",getAllRooms)

export default router