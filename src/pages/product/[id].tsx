import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import type { GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Product(){
  const {query} = useRouter()

  useEffect(()=>{

  },[])

  return(
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>
      <ProductDetails>
        <h1>Camisa XYZ</h1>
        <span> R$ 79,90</span>

        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure nostrum provident repellat excepturi consectetur voluptate perferendis quod harum dolor repellendus quas unde qui temporibus commodi quo, dolores voluptatem quam voluptates!</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticProps: GetStaticProps = async ()=>{

  return{
    props: {},
    revalidate: 60 * 60 * 1 //1hora de cache
  }
}