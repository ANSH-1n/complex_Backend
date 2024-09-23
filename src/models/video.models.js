import mongoose  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new  mongoose.Schema(
    {
    videoFile : {
        type : String,  //cloudnary will give the URL
        required : [ true, "video is required"]
    },
    thumbNail : {
        type : String, //cloudnary will give the URL
        required : true
    },
    title : {
        type : String, 
        required : true
    },
    description : {
        type : String, 
        required : true   
    },
    duration : {
        type : Number, //cloudnary will give the duration of video after uploading the video on it.
        required : true
    },
    views : {
        type : number,
        default : true
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
    
    
    },{timestamps : true}
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model(Video,videoSchema)