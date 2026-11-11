import { Home, Menu, ShoppingCart, UserCircle, LayoutGrid } from "lucide-react"
import '../styles/MenuMobile.css'
import { NavLink } from "react-router-dom"
import { CartContext } from '../App'
import { useContext } from "react"


export default function MenuMobile() {


   const menu = [
      { item: 'Home', icon: Home, pagin: '/' },
      { item: 'Categorias', icon: LayoutGrid, pagin: '/Categories' },
      { item: 'Carrinho', icon: ShoppingCart, pagin: '/Cart' },
      { item: 'Minha Conta', icon: UserCircle, pagin: '/UserCount/MyAccount/UserProfile' }
   ]

   const { cartNumber } = useContext(CartContext)

   return (
      <nav className="nav-mobile">
         {menu.map((item) => {
            const Icon = item.icon
            return (
               <NavLink key={item.pagin} to={item.pagin} className={({ isActive }) => isActive ? 'btn-nav-mobile btn-nav-mobile-active' : 'btn-nav-mobile'} >
                  <Icon size={25} />
                  {
                     item.item === 'Carrinho' ?
                        <>
                           <span className="span-text"> {item.item}</span>
                           {cartNumber > 0 && <span className="span-text span-cart"> {cartNumber}  </span>}
                        </> :
                        <>
                           <span className="span-text"> {item.item}</span>
                        </>
                  }
               </NavLink>
            )

         })}
      </nav >
   )
}