import mongoose  from "mongoose";
import {DB_NAME} from '../constants.js';

const connectDB = async () => {
    try {
    const constInstance =   await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log(`\n MONGODB CONNECTED !! DB Host: ${constInstance.connection.host}`)  

    } catch(error){
        console.error("mongoDB connection error")
        process.exit(1) //it is in node.js
    }
}


export default connectDB