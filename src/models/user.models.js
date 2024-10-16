import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        index : true, //it will create a index fro user field which helps for fast searching
        trim : true //it will remove the white  Space from the start to the last of the string
    },
    email : {
        type : String,
        required : true,
        unique : true ,
        lowercase : true,
        trim : true //it will remove the white  Space from the start to the last of the string   
    },
    fullName : {
        type : String,
        required : true,
        index : true, //it will create a index fro user field which helps for fast searching
        trim : true //it will remove the white  Space from the start to the last of the string
    },
    avatar : {
        type : String, //use cloudnary url .it is also same as aws
        required : true
    },
    coverImage : {
        type : String
    },
    watchHistory : [
        {
            type :   mongoose.Schema.Types.ObjectId,
            ref :    "Video"
        }
    ],
    password : {
        type : String,
        required : [ true,"Password is required" ],
    },
    refreshToken : {
        type : String
    }

    },{timestamps:true}
)


//here "pre" hook is using as middleware and don't use arrow function here (REMINDER) and if we are not using the if condition here then we will change the password everytime when we make any change in the upper fields .so, to remove that problem we can use here if statment with "this.modified(password)" .when the password is modified then only do hashing of that password

userSchema.pre("save",async function(next){
    if(!this.ismodified("password")) return next()
    this.password =  bcrypt.hashSync("this.password",10)  //10 is a salt here
    next()
})


userSchema.methods.isPasswordCorrect = async function(password) {
 return await bcrypt.compare(password, this.password) //1st parameter plain password entered by user and 2nd is hashed pas
}


//jwt.sign(payloads,secrete,expiry_duration) takes three parameters. As we gave below
userSchema.methods.generateAccessToken = async function() {
      return  jwt.sign(
        {
          _id : this.id,
          username : this.username,
          email : this.email,
          fullName : this. fullName  //payloads = this.anything  is coming from db
          },
          process.env.ACCESS_TOKEN_SECRETE,
          {
            expireIn : process.env.ACCESS_TOKEN_EXPIRY 
          }
    )
}


userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
        _id : this.id,
    }, process.env.REFRESH_TOKEN_SECRETE,
    {
        expireIn : REFRESH_TOKEN_EXPIRY 
    }
)
}

export const User = mongoose.model( 'User' , userSchema )