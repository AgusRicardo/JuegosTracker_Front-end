import { Disclosure } from '@headlessui/react'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import menuItems from './menuItems.json';


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = ({ onMenuClick }: { onMenuClick: (item: string) => void }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <Disclosure as="nav" className="bg-gray-900 flex flex-col">
        <div className="flex flex-col h-full">
          <div className="flex-grow px-3 py-4">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <NavLink 
                  key={item.name} 
                  to={item.href}
                  onClick={() => onMenuClick(item.name)} 
                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'flex justify-center items-center rounded-md py-2 text-sm font-medium'
                    )
                  }
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-10 mx-1 w-10 object-cover"
                  />
                </NavLink>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center space-y-4 pb-4">
            <button
              type="button"
              onClick={() => navigate('/logout')}
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only" >Cerrar sesión</span>
              <ArrowLeftEndOnRectangleIcon aria-hidden="true" className="h-6 w-6"/>
            </button>
          </div>
        </div>
      </Disclosure>
    </div>
  )
}

export default Navbar;
