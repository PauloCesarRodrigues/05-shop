import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import type { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import type Stripe from "stripe"


interface ProductProps{
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({product}: ProductProps){
  function handleBuyProduct(){
    console.log(product.defaultPriceId)
  }


  return(
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure nostrum provident repellat excepturi consectetur voluptate perferendis quod harum dolor repellendus quas unde qui temporibus commodi quo, dolores voluptatem quam voluptates!</p>

        <button onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () =>{
  return {
    paths: [
      {params: { id: 'prod_RfyfbKLKBABWWb' }}
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params })=>{
  const productId = params? params.id : 'undefinedProduct';

  const product = await stripe.products.retrieve(productId as string,{
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

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
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 //1hora de cache
  }
}