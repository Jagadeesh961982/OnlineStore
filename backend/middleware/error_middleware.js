const errorMidleware=(err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "Internal server error";
    const extraDetails=err.extraDetails || ""
    console.log(`Error: ${message} , ${extraDetails}`);
    res.status(status).json({message,extraDetails});
}

export default errorMidleware;