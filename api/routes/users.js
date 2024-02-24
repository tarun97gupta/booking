import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"


//Specific route provide various controller based actions such as post,get,put and delete methods.

const router = express.Router()

// //Check Token
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user you are logged in")
// })

// //Check user for update
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user you are logged in and you can update your details")
// })

// //Verify Admin

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Welcome, you are an administrator")
// })

//Update

//Here we take another middleware controller to verify if the user is admin or not.

router.put("/:id", verifyUser, updateUser)

//Delete

router.delete("/:id", verifyUser, deleteUser)

//Get

router.get("/:id", verifyUser, getUser)

//GetAll

router.get("/", verifyAdmin, getAllUsers)

export default router