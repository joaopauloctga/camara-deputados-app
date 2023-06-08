import React from 'react';
import Link from 'next/link';

const Header = ({currentRoute}) => {
  const links = [
    ['Home', '/'],
    ['Deputados', '/deputados'],
    ['Proposições', '/proposicoes'],
    ['Partidos', '/partidos'],
    ['Eventos', '/eventos'],
    ['Entrar', '/entrar'],
  ];
  
  const linkClass = 'text-gray-300 hover:bg-gray-700 hover:text-white';
  const linkActive = 'bg-white text-black hover:bg-gray-700 hover:text-white'
  return (
    <nav className="bg-gray-800 py-4">
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
              <Link href={link[1]} className={`${link[1] == currentRoute?.pathname ? linkActive : linkClass} rounded-md px-3 py-2 text-sm font-medium`}>
                {link[0]}
              </Link>
            </li>
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;