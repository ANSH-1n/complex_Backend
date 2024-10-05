import {Router} from 'express';
import { loggedOutUser, loginUser ,  registerUser  } from '../controllers/user.controllers.js'; 
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


export default router