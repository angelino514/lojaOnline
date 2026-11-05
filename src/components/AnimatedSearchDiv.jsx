import { useState, useEffect } from 'react'
import '../styles/AnimatedSearchDiv.css'

export default function AnimatedSearchDiv({ active }) {

   const placeholders = [
      "pesquisar produtos...",
      "buscar vestidos...",
      "procurar sapatos...",
      "encontrar ofertas..."
   ]

   const [placeholderIndex, setPlaceholderIndex] = useState(0)
   const [fade, setFade] = useState(true)

   useEffect(() => {
      const interval = setInterval(() => {
         setFade(false)
         setTimeout(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
            setFade(true)
         }, 300)
      }, 3000)

      return () => clearInterval(interval)
   }, [])

   return (
      <div className='aside-search-box' onClick={() => { active() }}>
         <span className={`animated-placeholder ${fade ? 'fade-in' : 'fade-out'}`}>
            {placeholders[placeholderIndex]}
         </span>
      </div>
   )
}