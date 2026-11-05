import { ChevronRight, Store, CircleHelp, X } from 'lucide-react'
import '../styles/SidebarMenu.css';
import { useNavigate } from 'react-router-dom';
import filtercategories from '../modules/categories';
import { useContext } from 'react'
import { CartContext } from '../App'

export default function SidebarMenu({ pagin }) {

  const newProducts = filtercategories()
  const navegation = useNavigate()

  const { setSidbarAtivo } = useContext(CartContext)

  function statusSearch(values) {
    if (pagin === "Home") {
      navegation(`/Result/Categories/${values}`)
      setSidbarAtivo(false)
      return
    }

    navegation(`/Result/Categories/${values}/ReferencesResult`)
    setSidbarAtivo(false)
  }

  const inf = [
    {
      button: 'Sobre a Loja',
      icon: Store
    },
    {
      button: 'Ajuda',
      icon: CircleHelp
    }
  ]



  return (
    <section className="section-sidebar">
      <aside className='face'>
        <div className='container-closer-menu'>
          <a href=""> Loja Online </a>
          <button onClick={() => { setSidbarAtivo(false) }}> <X size={20} /> </button>
        </div>

        <nav className='SidebarMenu'>
          <ul className='e-menu-list'>
            {newProducts.map((item) => (
              <li className='li-e-menu' key={item.id}
                onClick={() => { statusSearch(item.categoria) }}
              >
                <div className='li-content'>
                  <span className='category-icon'>
                    <img src={`https://banck-end.vercel.app/imagens/${item.id}`} alt={item.nome || item.categoria} />
                  </span>
                  <span className='category-name'>{item.categoria}</span>
                </div>
                <ChevronRight size={16} className='chevron-icon' />
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-actions">
          {inf.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                type="button"
                className="sidebar-action"
              >
                <Icon size={18} />
                <span>{item.button}</span>
              </button>
            )
          })}
        </div>
      </aside>
    </section>
  )
}