import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react"
import getBrowserId from "./modules/getBrowserId"
import Home from "./pages/Home"
import Start from './pages/Start'
import Cart from './pages/Cart'
import UserCount from './pages/UserCount'
import Categories from './pages/Categories'
import Result from './pages/Result'
import ResultIndex from './components/ResultIndex'
import ReferencesResult from './components/ReferencesResult'
import ProductDetails from './pages/ProductDetails'
import Login from './components/Login'
import Register from './components/Register'
import MyAccount from './components/MyAccount'
import UserProfile from './components/UserProfile'
import Orders from './components/Orders'
import Favorites from './components/Favorites'
import filtercategories from './modules/categories';


export const CartContext = createContext()

function App() {


   const productList = filtercategories()
   const [cartNumber, setCartNumber] = useState(0)
   const [sidbarAtivo, setSidbarAtivo] = useState(false)
   const [oldSearches, setOldSearches] = useState([])

   useEffect(() => {
      async function getCartNumber() {
         const formData = new FormData()
         formData.append("browserId", getBrowserId());
         const response = await fetch("https://banck-end.vercel.app/getCartItems", {
            method: "POST",
            credentials: 'include',
            body: formData
         });
         const data = await response.json()
         setCartNumber(data.productsCart.length)
      }
      getCartNumber()

      async function getOldSearches() {
         try {
            const formData = new FormData()
            formData.append('browserId', getBrowserId())
            const response = await fetch(
               'https://banck-end.vercel.app/historicoPesquisas',
               {
                  method: 'POST',
                  body: formData,
                  credentials: 'include',
               }
            )

            const data = await response.json()
            setOldSearches(data)

         } catch (error) {
            return
         }
      }
      getOldSearches()

   }, [])

   return (
      <CartContext.Provider value={{
         cartNumber, setCartNumber, productList,
         sidbarAtivo, setSidbarAtivo, oldSearches
      }}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} >
                  <Route index element={<Start />} />
               </Route>


               <Route path='/Categories' element={<Categories />} />
               <Route path='/Cart' element={<Cart />} />

               <Route path='/UserCount' element={<UserCount />}>
                  <Route index element={<Login />} />
                  <Route path='Register' element={<Register />} />

                  <Route path="/UserCount" element={<UserCount />}>
                     <Route index element={<Login />} />

                     <Route path="Register" element={<Register />} />

                     <Route path="MyAccount" element={<MyAccount />}>
                        <Route index element={<Navigate to="Profile" replace />} />
                        <Route path="Profile" element={<UserProfile />} />
                        <Route path="Orders" element={<Orders />} />
                        <Route path="Favorites" element={<Favorites />} />
                     </Route>
                  </Route>

               </Route>

               <Route path="/Result/:action/:values" element={<Result />}>
                  <Route index element={<ResultIndex />} />
                  <Route path='ReferencesResult' element={<ReferencesResult />} />
               </Route>
               <Route path='/ProductDetails/:id/:action/:values' element={<ProductDetails />} />
            </Routes>
         </BrowserRouter>
      </CartContext.Provider>
   )

}

export default App
