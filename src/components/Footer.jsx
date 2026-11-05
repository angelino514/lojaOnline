import '..styles/Footer.css';

export default function Footer() {
  return (
    <footer className="ali-footer">
      <div className="ali-footer-container">
        <div className="ali-footer-col">
          <h4>Atendimento ao Cliente</h4>
          <a href="#help">Central de Ajuda</a>
          <a href="#orders">Meus Pedidos</a>
          <a href="#disputes">Reembolsos e Disputas</a>
        </div>
        <div className="ali-footer-col">
          <h4>Guia de Compras</h4>
          <a href="#payment">Métodos de Pagamento</a>
          <a href="#shipping">Opções de Frete</a>
          <a href="#protection">Proteção ao Consumidor</a>
        </div>
        <div className="ali-footer-col">
          <h4>Conecte-se Conosco</h4>
          <a href="#app">Baixe o App</a>
          <a href="#social">Redes Sociais</a>
        </div>
      </div>
      <div className="ali-footer-bottom">
        <p>© 2026 AliExpress Clone - Todos os direitos reservados. Fundo Off-White Pink Aesthetic.</p>
      </div>
    </footer>
  );
}