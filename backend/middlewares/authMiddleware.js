import JWT from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

export const requireSignIn=async(req,res,next)=>{
try {
    const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
    req.user=decode;
    next();
} catch (error) {
    console.log(error)
}}


export const isAdmin= async(req,res,next)=>{
        try {
            const user= await usersModel.findById(req.user._id);
            if(user.role!==0){
                return res.status(401).send({
                    success:false,
                    message:"Unaturized access",
                })
            }else{
                next();
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({
                success:false,
                message:"Error in middleware",
                error
            })
        }
}

export const isDiliveryPartner= async(req,res,next)=>{
    try {
        const user= await usersModel.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:"Unaturized access",
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in middleware",
            error
        })
    }
}
