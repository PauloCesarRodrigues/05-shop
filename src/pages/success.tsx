import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer, SucessImagesContainer } from "@/styles/pages/success";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type Stripe from "stripe";

interface SuccessProps{
  customerName: string
  products:{
    name: string
    imageUrl: string
  }[]
  productImages: string[]
}

export default function Success({customerName, products, productImages}: SuccessProps){
  

  return(
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        
        <meta name="robots" content="noindex"/>
      </Head>


      <SuccessContainer>
        <h1> Compra efetuada </h1>

        <SucessImagesContainer>
          {products?.map((product, index) => (
            <ImageContainer key={index}>
              <Image src={productImages[index]} width={120} height={110} alt={product.name}/>
            </ImageContainer>
          ))}
        </SucessImagesContainer>


        <p>
          Uhuul <strong>{customerName}</strong>, {products.length > 1 ? 'suas camisas' : 'sua camisa'} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details?.name;
  const products = session.line_items!.data
  const productImages = []

  for(let i = 0; i < products.length; i++){
    productImages.push(products[i].price?.product.images[0])
  }



  console.log('aqui:')
  console.log('aqui:')
  console.log('aqui:')
  console.log('aqui:')
  console.log('aqui:')
  console.log('aqui:')
  console.log('aqui:')
  console.log('aqui:')
  console.log(productImages)



  return {
    props: {
      customerName,
      products,
      productImages
    }
  }
}