import React from 'react';
import Link from 'next/link';

const Header = ({currentRoute}) => {
  const links = [
    ['Home', '/'],
    ['Deputados', '/deputados'],
    ['Proposições', '/proposicoes'],
    ['Partidos', '/partidos'],
    ['Eventos', '/eventos'],
  ];
  
  const linkClass = 'text-white bg-hover-1 hover-primary';
  const linkActive = 'bg-white t-secondary';

  const menuLinkIsActive = (menuLink) => {
    const nestedRoute = currentRoute?.pathname.includes(menuLink) && currentRoute?.pathname.includes('[id]')
    return menuLink == currentRoute?.pathname
  }

  return (
    <nav className="bg-1 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            Home
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            {links.map((link, index) => {
              return <li key={`link-key-${index}`}>
              <Link href={link[1]} className={`${menuLinkIsActive(link[1]) ? linkActive : linkClass} rounded-md px-3 py-2`}>
                {link[0]}
              </Link>
            </li>
            })}
            <li style={{'margin-left': '75px'}}><Link href='/entrar' className='btn-1'>Entrar</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;