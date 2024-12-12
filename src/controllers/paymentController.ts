import { Request, Response } from 'express';
import Stripe from 'stripe';

// Initialize Stripe without specifying the apiVersion (it will use the default)
const stripe = new Stripe('your_stripe_secret_key');

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  const { userId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating payment intent.', error: error.message });
  }
};
