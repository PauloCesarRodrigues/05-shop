import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import { useState } from "react";
import { CartComponent } from "@/components/CartComponent";
import { Container } from "@/styles/pages/app";
import Cart from "@/context/cartProvider";


import { HeaderComponent } from "@/components/HeaderComponent";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [isCartClosed, setIsCartClosed] = useState(false);

  function changeCartVisibility(boolean: boolean){
    setIsCartClosed(!boolean)
  }

  return (
    <Cart>
      <CartComponent
        isCartClosed={isCartClosed}
        setIsCartClosed={setIsCartClosed}
      />

      <Container>
          <HeaderComponent changeCartVisibility={changeCartVisibility}/>
        <Component 
          {...pageProps}
          changeCartVisibility={changeCartVisibility}
        />
      </Container>
    </Cart>
  );
}
