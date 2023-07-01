import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = ({currentRoute}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      setIsMenuOpen(false);
    };

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const links = [
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
          <Link href="/">Home</Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          {/* Desktop Menu */}
          <Link href="/">
            Home
          </Link>
          {links.map((link, index) => (
            <Link
              key={`link-key-${index}`}
              href={link[1]}
              className={`${
                menuLinkIsActive(link[1]) ? linkActive : linkClass
              } rounded-md px-3 py-2`}
            >
              {link[0]}
            </Link>
          ))}
          <Link href="/entrar" className="btn-1">
            Entrar
          </Link>
        </div>
        <div className="lg:hidden">
          {/* Mobile Menu */}
          <button
            className="text-2xl text-white focus:outline-none"
            onClick={toggleMenu}
          >
            &#8801;
          </button>
        </div>
      </div>
      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="lg:hidden text-right">
          <ul className="flex flex-col space-y-2">
            {links.map((link, index) => (
              <li className='border-b border-color-white' key={`link-key-${index}`}>
                <Link
                  href={link[1]}
                  className={`${
                    menuLinkIsActive(link[1]) ? linkActive : linkClass
                  } rounded-md px-3 py-2`}
                >
                  {link[0]}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/entrar" className="btn-1">
                Entrar
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;