import { AlertCircle, X } from "lucide-react";
import "../styles/TextErro.css";


export default function TextErro({ message, setAction }) {
   if (!message) return null;


   return (
      <section className="error-modal-overlay">
         <div className="error-modal-card">
            {/* Ícone e Mensagem */}
            <div className="error-content-body">
               <div className="error-icon-bg">
                  <AlertCircle size={28} className="error-icon" />
               </div>
               <div className="error-text-group">
                  <h3>Atenção</h3>
                  <p>{message}</p>
               </div>
            </div>

            {/* Botões de Ação */}
            <div className="error-actions-group">
               <button
                  type="button"
                  className="btn-modal btn-cancel"
                  onClick={() => { setAction('cancel') }}
               >
                  Cancelar
               </button>

               <button
                  type="button"
                  className="btn-modal btn-continue"
                  onClick={() => { setAction('continue') }}
               >
                  Continuar
               </button>
            </div>
         </div>
      </section>
   );
}