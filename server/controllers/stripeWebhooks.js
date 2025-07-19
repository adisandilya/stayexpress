import { request, response } from "express";
import Stripe from "stripe";
import Booking from "../models/Booking.js";

// Api to handle stripe webhooks

export const stripeWebhooks = async(request,response)=>{
    // Stripe GateWay Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        response.status(400).send(`Webhooks Error:${err.message}`)
    }
    // handle the event
    if(event.type ==="payment_intent.succeeded"){
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        // Getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId,
        })
        const {bookingId} = session.data[0].metadata;
        // Mark payment
        await Booking.findByIdAndUpdate(bookingId,{isPaid:true ,paymentMethod:"Stripe"})
    }else{
        console.log("Unhandled event type :",event.type)
    }
    response.json({received:true});
}