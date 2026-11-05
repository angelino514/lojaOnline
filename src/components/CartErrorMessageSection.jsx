import "../styles/CartErrorMessageSection.css";
import { AlertCircle } from "lucide-react";

export default function CartErrorMessageSection() {
  return (
    <section className="cart-error-fullscreen-section">
      <div className="face">
        {/* Ícone de Erro/Aviso */}
        <div className="error-icon-badge">
          <AlertCircle size={24} strokeWidth={2.5} />
        </div>

        {/* Mensagem Principal */}
        <div className="cart-error-content">
          <h3 className="cart-error-title">Não foi possível adicionar</h3>
          <p className="cart-error-sub">Ocorreu um problema ao processar o seu pedido. Tente novamente.</p>
        </div>

        {/* Botões de Ação */}
        <div className="cart-error-actions">
          <button className="btn-action cancel">Cancelar</button>
          <button className="btn-action retry">Tentar Novamente</button>
        </div>
      </div>
    </section>
  );
}