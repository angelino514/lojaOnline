import { CheckCircle2, X } from "lucide-react";
import "../styles/TextSucess.css";

export default function TextSucess({ message, setAction }) {
   if (!message) return null

   return (
      <section className="success-modal-overlay">
         <div className="success-modal-card">

            {/* Botão de Fechar no topo */}

            <button type="button" className="btn-modal-close"
               onClick={() => { setAction('continue') }}>
               <X size={18} />
            </button>


            {/* Ícone e Mensagem */}
            <div className="success-content-body">
               <div className="success-icon-bg">
                  <CheckCircle2 size={32} className="success-icon" />
               </div>
               <div className="success-text-group">
                  <h3>Sucesso!</h3>
                  <p>{message}</p>
               </div>
            </div>

            {/* Botões de Ação */}
            <div className="success-actions-group">
               <button
                  type="button"
                  className="btn-modal btn-success-continue"
                  onClick={() => { setAction('continue') }}
               >
                  Continuar
               </button>
            </div>
         </div>
      </section>
   );
}