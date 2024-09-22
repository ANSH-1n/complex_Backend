// require('dotenv').config({path : './.env'})

// import mongoose from 'mongoose';
// import {DB_NAME} from '../constants.js';
// import express from 'express';
import connectDB  from './db/index.js';
import dotenv from 'dotenv';
import {app} from './app.js';

dotenv.config({
    path : './.env'
})

connectDB() //bcz we know connectDB variable holds a async function which return promise
.then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log(`server serve at ${process.env.PORT  || 8000}`)
  })
})
.catch((error)=>{
    console.log('mongodb connection error !!!',error)
})



//1st approach to connect the database by using IIFE and also write "semi colon" ; before using IIFE. This is a profesional approach.

// ;( async() => {
//     try {
//     await mongoose.connect(`${process.env.MONGODB_URL}`)
//     app.on("error",(error)=>{
//         console.log('Error:',error)
//         throw error 
//     })

//     app.listen(process.env.PORT,()=>{
//         app.listen(`server is listening at port number:${process.env.PORT}`)
//     })

//     }catch {
//         console.error("error :", error)
//         throw error
//     }
// })()

