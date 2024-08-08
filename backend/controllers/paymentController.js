import Stripe from 'stripe';




export const processPayment=async(req,res,next)=>{
    
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
    // console.log("stripe",stripe)
      
    try{
    // console.log("hello",req.body.amount)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'inr',
        // capture_method:'manual',
        // payment_method_types:['card'],
        // description:'Software development services',
        // confirm:true,
        

    })
    // console.log("paymentInt",paymentIntent)
    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    })
    }catch(error){
        // console.log(error)
        const err=new Error("Trouble in processing payment")
        err.status=400;
        err.extraDetails=error.message
        next(err)
    }
}

export const sendStripeApiKey=async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
}