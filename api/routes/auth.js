import express from "express"
import { login, register } from "../controllers/auth.js"

const router = express.Router()

//Specific route provide various controller based actions such as post,get,put and delete methods.

router.post('/register', register )
router.post('/login',login)

export default router