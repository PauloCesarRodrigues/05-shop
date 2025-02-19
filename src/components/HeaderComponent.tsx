import Image from "next/image";
import logoImg from "@/assets/logo.svg";
import cartIcon from "@/assets/cart/cartIconGray.svg";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { Header } from "@/styles/components/header";


interface HeaderComponentProps {
  changeCartVisibility: (arg0: boolean) => void;
}


export function HeaderComponent({ changeCartVisibility }: HeaderComponentProps) {

  const {cartCount} = useShoppingCart()

  return(
    <Header>
      <Link href={"/"}>
        <Image src={logoImg} alt="logo ignite" />
      </Link>
      <div>
        <span>{cartCount}</span>
        <button onClick={() => changeCartVisibility(false)}>
          <Image src={cartIcon} alt="Carrinho" width={24} height={24} />
        </button>
      </div>
    </Header>
  )
} 


