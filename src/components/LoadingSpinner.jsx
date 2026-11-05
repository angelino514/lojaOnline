import { LoaderCircle } from 'lucide-react'
import '../styles/LoadingSpinner.css'

export default function LoadingSpinner() {
   return (
      <div className="loading-container">
         <LoaderCircle className="loading-icon" size={30} />
      </div>
   )
}