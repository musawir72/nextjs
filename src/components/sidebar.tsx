import Link from 'next/link';
import LogoutButton from './buttons/LogoutButton';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (

    <aside className="bg-gray-800 text-white md:w-64 md:h-screen md:h-auto">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="p-4">
        <ul>
          <li className={`link ${pathname === '/protected/home' ? 'active' : ''}`}>
            <Link href="/protected/charts" className="block py-2 hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li className={`link ${pathname === '/protected/products' ? 'active' : ''}`}>
            <Link href="/protected/products" className="block py-2 hover:bg-gray-700">
              Products
            </Link>
          </li>
          <li>
            <LogoutButton/>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;