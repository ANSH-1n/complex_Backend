import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError, apiError} from '../utils/ApiError.js';
import {User} from '../models/user.models.js';
import {uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async (req,res) => {
   //get user details from frontend
   //validation - not empty
   //check if user already exist or not by using unique fiekds that are email and name.
   //check for images, check for avatar
   //upload them to cloudinary, avatar
   //create user object and also create entery in db
   //remove password and refresh token from the response
   //check for user creation
   //return response

     //get user details from frontend
   const {email} = res.body
   console.log("email:",email)

      //validation - not empty
   if(fullName === ""){
    throw new apiError(400,"fullName is required")
   }

   if(email === ""){
    throw new apiError(400,"email is required")
   }

   if(password === ""){
    throw new apiError(400,"password is required")
   }

   if(fullName === ""){
    throw new apiError(400,"fullName is required")
   }

   if(username === ""){
    throw new apiError(400,"username is required")
   }
   // or for upper all if statements there ie one single line advance code  below
//     if(
//    [username ,fullName, email, password].some((field) => 
//  field?.trim() === "")
//   ){
//       throw new apiError(400,"All fields are required")
//   }



      //check if user already exist or not by using unique fiekds that are email and name.
    const existingUser =  User.findOne({
        $or : [ (username),(email) ] 
    })

    if(existingUser){
        throw new ApiError(409,"username and email are already exist ")
    }



    //check for images, check for avatar
    const avatarLocalPath = res.files?.avatar[0]?.path;
    const coverImageLocalPath = res.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is not uploaded on the local path")
    }

    if(!coverImageLocalPathLocalPath){
        throw new ApiError(400, "coverImage is not uploaded on the local path")
    }

       //upload them to cloudinary, avatar
       const avatar = await  uploadOnCloudinary(avatarLocalPath)
       const image = await uploadOnCloudinary (coverImageLocalPath)

       if(!avatar){
          throw new ApiError(400,"Avatar is required ")
       }

       if(!image){
         throw new ApiError(400, "coverImage is not uploaded on the local path")
       }
    


      //create user object and also create entery in db
      const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage.url,
        email,
        password,
        usename : username.toLowerCase()
      })  

         //remove password and refresh token from the response (below: .select( "-password refreshToken")) removing
       //check for user creation
      const createdUser =  await User.findById(user._id).select(
        "-password refreshToken"
      )

      if(!createdUser){
        throw new ApiError(500,"something went wrong while regestring  the error")
      }


        //return response
     return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully",)
     )   

})

export {registerUser}