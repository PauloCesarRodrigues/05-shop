/* eslint-disable @typescript-eslint/no-require-imports */
"use-client"

import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import logoImg from '@/assets/logo.svg'
import cartIcon from '@/assets/cart/cartIconGray.svg'


import Image from 'next/image';
import { useEffect, useState } from "react";
import { CartComponent } from "@/components/Cart";
import { Container, Header } from "@/styles/pages/app";
import Link from "next/link";


globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const [isCartClosed, setIsCartClosed] = useState(false)

  useEffect(() => {
    setIsClient(true); 
  }, []); 
  if (!isClient) {
    return null; 
  } // se n tiver no clientside n executa

  const { CartProvider } = require("use-shopping-cart"); 



  function handleOpenCart(){
    setIsCartClosed(!isCartClosed)
  }

  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY ? process.env.STRIPE_PUBLIC_KEY : '' }
      currency="BRL"
      shouldPersist={true}
    >

      <CartComponent isCartClosed={isCartClosed} setIsCartClosed={setIsCartClosed}/>

      <Container>
        <Header>
          <Link href={'/'}><Image src={logoImg} alt="logo ignite" /></Link>
          <button onClick={()=> handleOpenCart()}>
            <Image src={cartIcon} alt="Carrinho" width={24} height={24} />
          </button>
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
