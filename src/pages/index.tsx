
import { HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/image"

import Head from 'next/head'

import {useKeenSlider} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "@/lib/stripe"
import type { GetStaticProps } from "next"
import type Stripe from "stripe"
import Link from "next/link"

import cartIcon from '@/assets/cart/cartIconWhite.svg'

import { useShoppingCart } from 'use-shopping-cart'

interface HomeProps{
  products:{
    id: string,
    name: string,
    imageUrl: string,
    formattedPrice: string,
    description: string,
    price: number
    sku:string
    priceId: string
  }[],
  changeCartVisibility: (arg0: boolean) => void;
}

interface ProductProps{
  id: string,
  name: string,
  imageUrl: string,
  formattedPrice: string,
  description: string,
  price: number
  sku:string
  priceId: string
}

export default function Home({products, changeCartVisibility}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides:{
      perView: 3,
      spacing: 48
    }
  })

  const {addItem, cartDetails} = useShoppingCart()

  async function handleBuyProduct(product: ProductProps) {
    const CartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      currency: "BRL",
      sku: product.sku,
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
      <title>Home | Ignite Shop</title>
    </Head>

    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product =>{
        return(
          <Link key={product.id} href={`/product/${product.id}`} prefetch={false} onClick={() => changeCartVisibility(true)}>
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt=""/>
            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.formattedPrice}</span>
              </div>
              <button onClick={(e) => 
                { 
                  e.stopPropagation();
                  e.preventDefault();
                  handleBuyProduct(product);
                }
              }>
                <Image src={cartIcon} alt="" width={24} height={24}/></button>
            </footer>
          </Product>
          </Link>
        )
      })}
    </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      formattedPrice: price.unit_amount ? 
      new Intl.NumberFormat('pt-Br',{
        style: "currency",
        currency: 'BRL'
      }).format(price.unit_amount / 100)
      : 0,
      description: product.description,
      price: price.unit_amount ? price.unit_amount: 0,
      sku: product.id,
      priceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}

