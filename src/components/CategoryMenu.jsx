import '../styles/CategoryMenu.css';
import { Menu } from 'lucide-react';
import filtercategories from '../modules/categories';

export default function CategoryMenu({ pagin, setAtivoSugestons, sidbarAtivo, setSidbarAtivo }) {


  const newProducts = filtercategories()

  function ativesIttens() {
    setAtivoSugestons(false)
    setSidbarAtivo(!sidbarAtivo)
  }

  return (
    <nav className={pagin ? 'category-menu' : 'category-menu hiden-menu'}>

      <div className="container-btn-all-menu">
        <button className='btn-all-menu'
          onClick={() => { ativesIttens() }}
        >
          <Menu size={18} />
        </button>
        <span className='span-all-menu'>  Todas as Categorias </span>
      </div>

      <div className="category-container-menu">
        <ul className="category-list">
          {newProducts.map((cat) => (
            <li key={cat.id} className="ali-category-item">
              <span className="ali-category-icon">
                <img src={`https://banck-end.vercel.app/imagens/${cat.id}`} alt={cat.nome} />
              </span>
              <span className="ali-category-name">{cat.categoria}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}