import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb" })) //it accept and converts  the json file  with 16kb size.
app.use(express.urlencoded({extended : true, limit : '16kb'})) //it is used to encode the data that comes by url
app.use(express.static("public"))//it helps to store images and files,videos in our local system
app.use(cookieParser)

export {app}