import '../styles/Header.css'
import { Search, UserCircle, ShoppingCart, Menu, ArrowLeft } from 'lucide-react'
import SidebarMenu from './SidebarMenu'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../App'
import SearchSuggestions from './SearchSuggestions'
import AnimatedSearchDiv from './AnimatedSearchDiv'

export default function Header({ pagin }) {

   const { cartNumber, sidbarAtivo, setSidbarAtivo,
      suggestons, setSuggestons } = useContext(CartContext)

   const navigation = useNavigate()

   function activeSugesstons() {
      setSuggestons(true)
   }
   
   function searchProducts(value) {
      if (pagin === 'Home') {
         navigation(`/Result/Search/${value}`)
         setSuggestons(false)
         return
      }
      navigation(`/Result/Search/${value}/ReferencesResult`)
      setSuggestons(false)
   }

   const nav = [
      { button: 'Pesquisar', icon: Search, route: null },
      { button: 'Carrinho', icon: ShoppingCart, route: '/Cart' },
      { button: 'minha conta', icon: UserCircle, route: '/UserCount/MyAccount/UserProfile' }
   ]

   function routes({ button, values }) {
      if (button === 'Pesquisar') {
         activeSugesstons()
         return
      }
      navigation(values)
   }

   function componenNav(selector) {
      return (
         <nav className={selector}>
            {nav.map((item, index) => {
               const Icon = item.icon

               if (pagin === 'Home' && item.button === 'Pesquisar') {
                  return null
               }

               return (
                  <button
                     key={index}
                     className={item.button === 'minha conta' ? 'btn-nav-header  hiden-item' : 'btn-nav-header'}
                     onClick={() => { routes({ button: item.button, values: item.route }) }}
                  >
                     <Icon className='icon-hd-aside' size={20} />

                     <span className='text-aside-span'>
                        {item.button}
                     </span>

                     {item.button === 'Carrinho' && cartNumber > 0 && (
                        <span className='text-aside-span span-cart'>
                           {cartNumber}
                        </span>
                     )}
                  </button>
               )
            })}
         </nav>
      )
   }

   return (
      <>
         {suggestons && <SearchSuggestions searchProducts={searchProducts} />}
         <section className='section-header'>
            <header className='header'>
               <div className="face">
                  <aside className='aside-container'>
                     <div className="logo-aside-container">
                        <span className='logo-span-container'>

                           {pagin !== 'Home' && (<button
                              onClick={() => { window.history.back() }}
                           > <ArrowLeft size={22} /> </button>)}

                           <button className='btn-open-menu'
                              onClick={() => { setSidbarAtivo(!sidbarAtivo) }}
                           > <Menu size={20} /></button>

                           <a href="#">
                              <span> Loja </span>
                              <span>Online</span>
                           </a>
                        </span>
                        {componenNav('nav-mobile-aside-item')}
                     </div>

                     {pagin === 'Home' && (
                        <div className="aside-container-box">
                           <AnimatedSearchDiv active={activeSugesstons} />
                           <button className='btn-aside-search-box'> <Search size={15} /></button>
                        </div>)}

                  </aside>
                  {componenNav('nav-dasktop-header')}
               </div>
            </header>

            <aside className='face face-hader'>
            </aside>
         </section>

         {sidbarAtivo && <SidebarMenu pagin={pagin} />}
      </>
   )
}