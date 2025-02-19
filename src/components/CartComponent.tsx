import { 
  CartCheckout, 
  CartCloseButton, 
  CartContainer, 
  CartFinishOrderButton, 
  CartProduct, 
  CartTotal, 
  ImageContainer, 
  Cart 
} from "@/styles/components/cart";
import Image from "next/image";
import closeCartIcon from "@/assets/cart/closeCartIcon.svg";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";
import axios from "axios";

interface CartComponentProps {
  isCartClosed: boolean;
  setIsCartClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface checkoutSessionDataProps {
  success_url: string,
  cancel_url: string,
  mode: string,
  line_items?: {  
    price: string,
    quantity: number
  }[]  
}

export function CartComponent({ isCartClosed, setIsCartClosed }: CartComponentProps) {
  const [checkoutButtonDisabled, setCheckoutButtonDisabled] = useState(false);
  
  const { formattedTotalPrice, cartCount, removeItem, cartDetails, clearCart } = useShoppingCart();

  useEffect(() => {
    setCheckoutButtonDisabled(Number(cartCount) < 1);
  }, [cartCount]);

  const produtos = Object.values(cartDetails ?? {});


  const checkoutSessionData: checkoutSessionDataProps = {
      success_url: '/sucess',
      cancel_url: '/',
      mode: "payment",
      line_items: []
  }

  async function handleCheckout(){
    if(cartCount && cartCount <= 0 ) {setCheckoutButtonDisabled(true); return;}
    if( cartCount && cartCount >= 1){

      checkoutSessionData.line_items = produtos.map((product) => ({
        price: product.priceId,
        quantity: 1
      }));

      try{
        const response = await axios.post('/api/checkout', {
          checkoutData: checkoutSessionData
        })

        const { checkoutUrl } = response.data

        window.location.href = checkoutUrl

        clearCart()

      }catch(e){
        console.log('Ocorreu um erro no processo de Checkout' + e)
        setCheckoutButtonDisabled(false)

      }
  }
}
  
  return (
    <>
      {isCartClosed ? (
        <Cart>
          <CartCloseButton onClick={() => setIsCartClosed(!isCartClosed)}>
            <Image src={closeCartIcon} alt="Fechar carrinho" height={24} width={24} />
          </CartCloseButton>

          <CartContainer>
            <h2>Sacola de compras</h2>

            {produtos.map((produto) => (
              <CartProduct key={produto.id}>
                <ImageContainer>
                  <Image src={produto.imageUrl} alt={produto.name} height={95} width={95} />
                </ImageContainer>
                <div>
                  <p>{produto.name}</p>
                  <span>
                    <strong>{produto.formattedValue}</strong>
                  </span>
                  <button onClick={() => removeItem(String(produto.id))}>
                    <strong>Remover</strong>
                  </button>
                </div>
              </CartProduct>
            ))}

            <CartCheckout>
              <div>
                <p>Quantidade</p>
                <span>{cartCount} itens</span>
              </div>

              <CartTotal>
                <p>Valor total</p>
                <span>{formattedTotalPrice}</span>
              </CartTotal>

              <CartFinishOrderButton 
                disabled={checkoutButtonDisabled} 
                onClick={handleCheckout}
              >
                Finalizar Compra
              </CartFinishOrderButton>
            </CartCheckout>
          </CartContainer>
        </Cart>
      ) : (
        <div></div>
      )}
    </>
  );
}
