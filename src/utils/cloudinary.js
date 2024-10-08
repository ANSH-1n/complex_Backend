import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'; //it  is a module whih is present in node

cloudinary.config(
    {
    cloud_name :  process.env.CLOUDINARY_CLOUD_NAME,
    api_key :  process.env.CLOUDINARY_API_KEY ,
    api_secret :   process.env.CLOUDINARY_API_SECRET
    }
)



const uploadOnCloudinary = async (localFilePath)=> {
    try {
      if(!localFilePath) return null

      //upload the file on cloudinary
      const response = cloudinary.uploader.upload( localFilePath,{ resource_type : "auto" } )

      //after file uploadation successfully then we should do (below)
      console.log("File is uploaded on cloudinary",response.url)
      return response 
     

    }catch(error) {
      fs.linkSync(localFilePath)  //remove the locally save temporary files as the upload operation got failed
      return null
    }
}

export {uploadOnCloudinary }