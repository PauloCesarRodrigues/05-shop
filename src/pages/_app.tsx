"use-client";

import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import logoImg from "@/assets/logo.svg";
import cartIcon from "@/assets/cart/cartIconGray.svg";

import Image from "next/image";
import { useState } from "react";
import { CartComponent } from "@/components/Cart";
import { Container, Header } from "@/styles/pages/app";
import Link from "next/link";
import Cart from "@/context/cartProvider";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [isCartClosed, setIsCartClosed] = useState(false);

  function handleOpenCart() {
    setIsCartClosed(!isCartClosed);
  }

  return (
    <Cart>
      <CartComponent
        isCartClosed={isCartClosed}
        setIsCartClosed={setIsCartClosed}
      />

      <Container>
        <Header>
          <Link href={"/"}>
            <Image src={logoImg} alt="logo ignite" />
          </Link>
          <button onClick={() => handleOpenCart()}>
            <Image src={cartIcon} alt="Carrinho" width={24} height={24} />
          </button>
        </Header>
        <Component {...pageProps} />
      </Container>
    </Cart>
  );
}
