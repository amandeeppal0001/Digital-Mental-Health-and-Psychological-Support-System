import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";
// mongoose.set("debug", true);

 const verifyJWT = asyncHandler(async(req, res, next) => {
    //  const token =  req.cookies?accessToken || req.header
    try {
         const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    // console.log('start');
    
         if (!token){
            throw new ApiError(401,"Unauthorized request")
         }
            // console.log('end');

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select
        ("-password -refreshToken")
    
        if (!user){
            // NEXT_VIDEO: discuss about frontend 
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})


export default verifyJWT