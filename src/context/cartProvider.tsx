"use client";
import React, { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";


const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider
    cartMode="checkout-session"
    stripe={process.env.STRIPE_PUBLIC_KEY!}
    currency={'BRL'}
    shouldPersist={true}
  >
    <>{children}</>
  </CartProvider>
);

export default Cart;