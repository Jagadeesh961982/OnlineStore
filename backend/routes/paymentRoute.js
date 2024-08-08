import express from 'express';
import { isAuthenticatedUser } from '../middleware/authenticaton.js';
import { processPayment, sendStripeApiKey } from '../controllers/paymentController.js';


const router=express.Router();

router.post('/process/payment',isAuthenticatedUser,processPayment)

router.get('/stripeapikey',isAuthenticatedUser,sendStripeApiKey)

export default router;