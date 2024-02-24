import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

//Inside controllers, we use different MONGODB functions/actions and then perform what action is to be taken on DB.

export const register = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(201).send("User has been created")
    }catch(err){
        next(err)
    }

}

export const login = async (req,res,next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createError(404,"User Not Found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"Username or Password is incorrect"))

        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

        const {password,isAdmin,...others} = user._doc
        
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).send(others)
    }catch(err){
        next(err)
    }

}