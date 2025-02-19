
import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import type Stripe from "stripe";
import { useShoppingCart } from 'use-shopping-cart'

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    priceId: string;
    sku: string;
    formattedPrice: number
  },
  changeCartVisibility: (arg0: boolean) => void
}

export default function Product({ product, changeCartVisibility }: ProductProps) {

  const { addItem,cartDetails } = useShoppingCart()



  async function handleBuyProduct() {
      const CartProduct = {
        id: product.id,
        name: product.name,
        price: product.formattedPrice, 
        imageUrl: product.imageUrl,
        description: product.description,
        currency: "BRL",
        priceId: product.priceId
      };

      const productId = product.id
 
      
      if (cartDetails && cartDetails[productId] && cartDetails[productId].quantity >= 1) return
    
      addItem(CartProduct)
      
      setTimeout(()=>{
        changeCartVisibility(false)
      },300)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente enim temporibus suscipit saepe dolore esse repellendus ipsum quaerat repudiandae impedit et dolor dolorum eius, exercitationem assumenda adipisci, beatae rem autem.</p>
          <button onClick={handleBuyProduct}>
            Colocar na sacola 
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_RfyfbKLKBABWWb" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params ? params.id : null

  const product = await stripe.products.retrieve(productId as string, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return{
    props: {
      product:{
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        url: product.url,
        price: price.unit_amount ? 
          new Intl.NumberFormat('pt-Br',{
            style: "currency",
            currency: 'BRL'
          }).format(price.unit_amount / 100)
        : 0,
        formattedPrice: price.unit_amount ? price.unit_amount: 0,
        description: product.description,
        defaultPriceId: price.id,
        sku: product.id,
      }
    },
    revalidate: 60 * 60 * 1 //1hora de cache
  }
}