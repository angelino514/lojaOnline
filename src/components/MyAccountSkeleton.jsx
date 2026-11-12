import "../styles/MyAccountSkeleton.css"

export default function MyAccountSkeleton() {
   return (
      <nav className="navbar-MyAccount-mobile skeleton-account">
         <div className="user-inf-mobile">
            <div className="face">
               <div className="skeleton-avatar skeleton-loading"></div>

               <div className="skeleton-name skeleton-loading"></div>

               <div className="skeleton-welcome skeleton-loading"></div>
            </div>
         </div>

         <aside className="containers-aside-menu">
            {[1, 2, 3].map((item) => (
               <div className="btns-mobils-accont-menu" key={item}>
                  <div className="face">
                     <div className="skeleton-icon skeleton-loading"></div>
                     <div className="skeleton-menu-text skeleton-loading"></div>
                  </div>
               </div>
            ))}
         </aside>
      </nav>
   );
}
