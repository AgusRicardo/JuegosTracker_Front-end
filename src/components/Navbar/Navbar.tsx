import { Disclosure } from '@headlessui/react'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import './Navbar.css';

const menuItems = [
  { name: 'Home', href: '/', img: 'https://cdn-icons-png.flaticon.com/512/2/2144.png' , current: false },
  { name: 'Steam', href: 'steam', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Steam_Logo.png' , current: false },
  { name: 'Epic Games', href: 'epic-games', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Epic_Games_logo.png', current: false },
  { name: 'Xbox', href: 'xbox', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png', current: false },
  { name: 'Gog', href: 'gog-com', img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/GOG.com_Logo.png', current: false },
  { name: 'Prime Gaming', href: 'prime-gaming', img: 'https://img.icons8.com/fluent/600/000000/prime-gaming.png', current: false },
  { name: 'Itch', href: 'itch', img: 'https://static-00.iconduck.com/assets.00/itch-io-icon-2048x2048-6n1nulpw.png', current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const [contentPage, setContentPage] = useState<string[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');

  useEffect(() => {
    setContentPage(['juego 1', 'juego 2']);	
  }, []);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    e.preventDefault();
    setSelectedMenuItem(name);
  };
  

  return (
    <div className="min-h-screen flex">
      <Disclosure as="nav" className="bg-gray-800 flex flex-col">
        <div className="flex flex-col h-full">
          <div className="flex-grow px-2">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleMenuClick(e, item.name)}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'flex justify-center items-center rounded-md px-3 py-2 text-sm font-medium'
                  )}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-10 w-10 object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center space-y-4 pb-4">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Cerrar sesión</span>
              <ArrowLeftEndOnRectangleIcon aria-hidden="true" className="h-6 w-6"/>
            </button>
          </div>
        </div>
      </Disclosure>

      {contentPage ? (
        <div className="flex-1 bg-white">
          <header className="bg-white shadow">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{selectedMenuItem}</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">Contenido de la page</div> 
          </main>
        </div>
      ) : (
        <div className="flex-1 bg-white">
          <header className="bg-white shadow">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{selectedMenuItem}</h1>
            </div>
          </header>
          <div className='flex-1 bg-white no-content-container'>
            <b className="mx-auto px-4 py-6 sm:px-6 lg:px-8 no-content-page">No se han encontrado juegos en esta plataforma</b>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;
