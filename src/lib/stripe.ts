import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : '';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia',
  appInfo:{
    name: 'ShirtShop'
  }
})