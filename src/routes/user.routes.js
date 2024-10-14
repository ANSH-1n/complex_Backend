import {Router} from "express";
import { 
    changeCurrentPassword, 
    getCurrentUser, 
    getUserChannelProfile,
     getWatchHistory, 
     loggedOutUser, 
     loginUser ,  
     refreshAccessToken,  
     registerUser, 
     updateAccountDetails, 
     updateUserCoverImage  } from '../controllers/user.controllers.js'; 
import { upload } from '../middlewares/multer.middlewares.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';


const router = Router();

router.route("/register").post(
    upload.fields([        //inject the middleware before the post request
        {
            name : "avatar",
            maxCount : 1
         },
        {
            name : "coverImage",
            maxCount : 1
        }
   ]),registerUser)

router.route("/login").post(loginUser)

//secure routes
router.route("/logout").post( verifyJwt , loggedOutUser)
router.route("/refresh-token").post( refreshAccessToken)
router.route("/change-password").post( verifyJwt , changeCurrentPassword)
router.route("/current-user").post( verifyJwt , getCurrentUser)
router.route("/change-password").get( verifyJwt , changeCurrentPassword)
router.route("/update-account").post( verifyJwt , updateAccountDetails)
router.route("/avatar").patch( verifyJwt , upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch( verifyJwt , upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get( verifyJwt , getUserChannelProfile)
router.route("/history").get( verifyJwt , getWatchHistory)

export default router