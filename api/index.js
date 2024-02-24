import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dotenv.config()

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB')
      } catch (error) {
        handleError(error);
      }
}

// app.get('/', (req,res)=>{
//     res.send("First request")
// })

// mongoose.connection.on('disconnected', () => console.log('disconnected'));
// mongoose.connection.on('connected', () => console.log('connected'));

//middleware

app.use(cors())

app.use(cookieParser())
app.use(express.json())

//Creating different routes below which perform different actions, here we take the Route function as second argument which we define in other module.

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message|| "Error Occured"
     return res.status(errorStatus).json(errorMessage)
})


app.listen(8800,()=>{
    connectDB()
    console.log("Connected to backend")
})