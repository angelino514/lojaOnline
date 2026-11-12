import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReceiptText, Info, ShieldCheck } from "lucide-react";
import "../styles/Checkout.css";
import Loading from "../components/Loading";

export default function Checkout() {

   const location = useLocation()
   const envios = [
      { id: "economico", nome: "Envio económico", prazo: "15 a 30 dias úteis", preco: 0 },
      { id: "padrao", nome: "Envio padrão", prazo: "7 a 15 dias úteis", preco: 1500 },
      { id: "expresso", nome: "Envio expresso", prazo: "3 a 7 dias úteis", preco: 3000 }
   ];

   const produtos = location.state?.produtos || []
   const [loading, setLoading] = useState(true);
   const [cliente, setCliente] = useState({
      nome: "",
      email: "",
      telefone: "",
      endereco: "Huambo, Angola"
   });

   useEffect(() => {
      async function verificarSessao() {
         try {
            const response = await fetch(
               "https://banck-end.vercel.app/verificarSessao",
               {
                  method: "GET",
                  credentials: "include"
               }
            );

            const data = await response.json();
            const dados_Usuario = data.usuario[0]
            setCliente(prev => ({
               ...prev,
               nome: dados_Usuario.nome + " " + dados_Usuario.sobrenome,
               email: dados_Usuario.email,
               telefone: dados_Usuario.telefone
            }));

         } catch (error) {
            return
         } finally {
            setLoading(false)
         }
      }
      verificarSessao();
   }, [])


   const [pagamento, setPagamento] = useState("express");
   const [envio, setEnvio] = useState("padrao");
   const [observacao, setObservacao] = useState("");
   const opcaoEnvio = envios.find(item => item.id === envio);

   const subtotal = produtos.reduce(
      (total, produto) =>
         total +
         produto.preco * produto.quantidade,
      0
   );

   const total = subtotal + opcaoEnvio.preco;
   const formatarPreco = valor =>
      valor.toLocaleString("pt-AO") + " Kz";


   function atualizarCliente(e) {
      const { name, value } = e.target;
      setCliente(prev => ({
         ...prev,
         [name]: value
      }));
   }

   async function finalizarPedido(e) {

      e.preventDefault();
      const pedido = {
         produtos,
         pagamento,
         envio,
         observacao,
         subtotal,
         total
      };

      const dados = new FormData();
      dados.append("pagamento", pedido.pagamento)
      dados.append("envio", pedido.envio)
      dados.append("total", pedido.total)
      dados.append("produtos", JSON.stringify(produtos))
      dados.append('observacao', pedido.observacao)
      dados.append('telefone', cliente.telefone)
      dados.append('endereco', cliente.endereco)

      try {
         const res = await fetch('https://banck-end.vercel.app/pedidos', {
            method: 'POST',
            credentials: 'include',
            body: dados
         })

         const data = await res.json()

      } catch (erro) {
         return
      }
   }

   return (
      <>
         {loading ? <Loading /> :
            <main className="checkout-container">

               <div className="checkout-header">
                  <div>
                     <h1>Finalizar compra</h1>
                     <p>Confirme os seus dados e finalize a sua encomenda.</p>
                  </div>

                  <span className="checkout-secure">
                     <ShieldCheck size={15} />
                     Compra segura
                  </span>
               </div>

               <form onSubmit={finalizarPedido}>

                  <div className="checkout-layout">
                     <section className="checkout-main">

                        {/* CLIENTE */}

                        <div className="checkout-card">

                           <div className="checkout-section-title">
                              <span className="checkout-number">1</span>
                              <div>
                                 <h2>Informações do comprador</h2>
                                 <p>Confirme os seus dados pessoais.</p>
                              </div>
                           </div>

                           <div className="checkout-fields">

                              <div className="checkout-field">
                                 <label>Nome completo</label>
                                 <input
                                    name="nome"
                                    value={cliente.nome}
                                    onChange={atualizarCliente}
                                    required
                                 />
                              </div>

                              <div className="checkout-field">
                                 <label>E-mail</label>
                                 <input
                                    type="email"
                                    name="email"
                                    value={cliente.email}
                                    onChange={atualizarCliente}
                                    required
                                 />
                              </div>

                              <div className="checkout-field">
                                 <label>Telefone</label>
                                 <input
                                    name="telefone"
                                    value={cliente.telefone}
                                    onChange={atualizarCliente}
                                    required
                                 />
                              </div>

                              <div className="checkout-field">
                                 <label>Endereço de entrega</label>
                                 <input
                                    name="endereco"
                                    value={cliente.endereco}
                                    onChange={atualizarCliente}
                                    required
                                 />
                              </div>

                           </div>
                        </div>

                        {/* PRODUTOS */}

                        <div className="checkout-card">

                           <div className="checkout-section-title">
                              <span className="checkout-number">2</span>
                              <div>
                                 <h2>Produtos selecionados</h2>
                                 <p>{produtos.length} produtos na encomenda.</p>
                              </div>
                           </div>

                           <div className="checkout-products">
                              {produtos.map(produto => {
                                 const variacao = {
                                    primeira: produto.especificacao_valor,
                                    segunda: produto.outra_especificacao_valor
                                 }

                                 return (<div className="checkout-product" key={produto.id}>
                                    <div className="checkout-product-image">
                                       <img src={`https://banck-end.vercel.app/imagens/${produto.produto_id}`} alt={produto.nome} />
                                    </div>

                                    <div className="checkout-product-info">
                                       <h3>{produto.nome}</h3>

                                       <p>Variação: {`${variacao.primeira}/${variacao.segunda}`}</p>

                                       <p>Quantidade: {produto.quantidade}</p>

                                       <strong>
                                          {formatarPreco(
                                             (produto.preco - produto.preco * 5 / 100) *
                                             produto.quantidade
                                          )}
                                       </strong>
                                    </div>

                                    <div className="checkout-product-total">
                                       <span>Subtotal</span>
                                       <strong>
                                          {formatarPreco(
                                             (produto.preco - produto.preco * 5 / 100) *
                                             produto.quantidade
                                          )}
                                       </strong>
                                    </div>

                                 </div>
                                 )
                              })}
                           </div>
                        </div>

                        {/* ENVIO */}

                        <div className="checkout-card">

                           <div className="checkout-section-title">
                              <span className="checkout-number">3</span>
                              <div>
                                 <h2>Método de envio</h2>
                                 <p>Escolha como deseja receber os produtos.</p>
                              </div>
                           </div>

                           <div className="checkout-options">

                              {envios.map(option => (
                                 <label
                                    key={option.id}
                                    className={`checkout-option ${envio === option.id ? "selected" : ""
                                       }`}
                                 >
                                    <input
                                       type="radio"
                                       name="envio"
                                       checked={envio === option.id}
                                       onChange={() => setEnvio(option.id)}
                                    />

                                    <div className="checkout-option-content">
                                       <strong>{option.nome}</strong>
                                       <span>{option.prazo}</span>
                                    </div>

                                    <strong className="checkout-option-price">
                                       {option.preco === 0
                                          ? "Grátis"
                                          : formatarPreco(option.preco)}
                                    </strong>
                                 </label>
                              ))}

                           </div>
                        </div>

                        {/* PAGAMENTO */}

                        <div className="checkout-card">

                           <div className="checkout-section-title">
                              <span className="checkout-number">4</span>
                              <div>
                                 <h2>Método de pagamento</h2>
                                 <p>Selecione a forma de pagamento.</p>
                              </div>
                           </div>

                           <div className="checkout-payment-options">

                              <label
                                 className={`checkout-payment ${pagamento === "express" ? "selected" : ""
                                    }`}
                              >
                                 <input
                                    type="radio"
                                    name="pagamento"
                                    checked={pagamento === "express"}
                                    onChange={() => setPagamento("express")}
                                 />

                                 <div className="checkout-payment-icon express-icon">
                                    <img
                                       width={40}
                                       src="/express.jfif"
                                       alt="pagamento-express"
                                    />
                                 </div>

                                 <div className="checkout-payment-info">
                                    <strong>Pagamento Express</strong>
                                    <span>Pagamento electrónico através do gateway.</span>
                                 </div>

                                 <span className="checkout-radio-indicator" />
                              </label>

                              <label
                                 className={`checkout-payment ${pagamento === "referencia" ? "selected" : ""
                                    }`}
                              >
                                 <input
                                    type="radio"
                                    name="pagamento"
                                    checked={pagamento === "referencia"}
                                    onChange={() => setPagamento("referencia")}
                                 />

                                 <div className="checkout-payment-icon reference-icon">
                                    <ReceiptText size={20} />
                                 </div>

                                 <div className="checkout-payment-info">
                                    <strong>Pagamento por Referência</strong>
                                    <span>Receba uma referência para efectuar o pagamento.</span>
                                 </div>
                                 <span className="checkout-radio-indicator" />
                              </label>

                           </div>

                           <div className="checkout-payment-notice">
                              <Info size={20} />
                              <p>
                                 Os dados de pagamento serão apresentados após
                                 a criação da encomenda.
                              </p>
                           </div>

                        </div>

                        {/* OBSERVAÇÃO */}

                        <div className="checkout-card">
                           <h2>Observações (opcional)</h2>

                           <textarea
                              value={observacao}
                              onChange={e => setObservacao(e.target.value)}
                              placeholder="Informações adicionais..."
                              rows={3}
                           />
                        </div>

                     </section>

                     {/* RESUMO */}
                     <aside className="checkout-summary">
                        <div className="checkout-summary-card">
                           <h2>Resumo da encomenda</h2>
                           <div className="checkout-summary-line">
                              <span>Produtos ({produtos.length})</span>
                              <strong>{formatarPreco(subtotal)}</strong>
                           </div>

                           <div className="checkout-summary-line">
                              <span>Envio</span>
                              <strong>
                                 {formatarPreco(opcaoEnvio.preco)}
                              </strong>
                           </div>

                           <div className="checkout-summary-divider" />
                           <div className="checkout-total">
                              <span>Total a pagar</span>
                              <strong>{formatarPreco(total)}</strong>
                           </div>

                           <button
                              type="submit"
                              className="checkout-submit"
                           >
                              Confirmar encomenda →
                           </button>

                           <div className="checkout-protection">
                              <ShieldCheck size={20} />
                              <div>
                                 <strong>Proteção da compra</strong>
                                 <p>Os seus dados são tratados de forma segura.</p>
                              </div>
                           </div>

                           <p className="checkout-terms">
                              Ao confirmar a encomenda, concorda com
                              os termos e condições da plataforma.
                           </p>

                        </div>

                     </aside>
                  </div>
               </form>
            </main>
         }
      </>
   );
}
