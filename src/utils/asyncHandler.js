//i.This utility is made to simplifies error handling in asynchronous Express.js route handlers. Normally, without this, you'd need to handle try...catch in every route handler, but by wrapping your handler in asyncHandler, it automatically handles any errors.


//2. this is the second method  to handle the route error which uses promises()

const asyncHandler = (requestHandler)=>{
     return (req,res,next) => {
        promise.resolve(requestHandler(req,res,next)).catch((error) => next(error) )
    }
}

export {asyncHandler}




//1st syntax to make this utility and this is way use try catch 
// const asyncHandler = (fn) => async(req,res,next) =>{
//     try {
//       await fn(req,res,next)
//     }catch(error){
//         res.error(res.error || 500).json({
//             success : false,
//             message : error.message
//         })  //500 denotes the srver issue
//     }
// }