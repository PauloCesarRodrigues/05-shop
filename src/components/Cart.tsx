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


interface CartComponentProps {
  isCartClosed: boolean;
  setIsCartClosed: React.Dispatch<React.SetStateAction<boolean>>;
}


export function CartComponent({ isCartClosed, setIsCartClosed }: CartComponentProps) {
  
  const produtos = [
    {
      id: 1,
      name: "Camisa Beyond the Limits",
      price: "79,90",
      imageUrl: "",
    },
    {
      id: 2,
      name: "Camisa Beyond the Limits",
      price: "79,90",
      imageUrl: "",
    },
  ];

  return (
    <>
      {isCartClosed ? (
        <Cart>
          <CartCloseButton onClick={() => setIsCartClosed(!isCartClosed)}>
            <Image src={closeCartIcon} alt="" height={24} width={24} />
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
                    <strong>R$ {produto.price}</strong>
                  </span>
                  <button>
                    <strong>Remover</strong>
                  </button>
                </div>
              </CartProduct>
            ))}

            <CartCheckout>
              <div>
                <p>Quantidade</p>
                <span>3 itens</span>
              </div>

              <CartTotal>
                <p>Valor total</p>
                <span>R$ 270,00</span>
              </CartTotal>

              <CartFinishOrderButton>Finalizar Compra</CartFinishOrderButton>
            </CartCheckout>
          </CartContainer>
        </Cart>
      ) : (
        <div></div>
      )}
    </>
  );
}
