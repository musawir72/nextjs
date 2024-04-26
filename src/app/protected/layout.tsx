'use client'
import Sidebar from "@/components/sidebar"
import { Provider } from "react-redux"
import { store } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [showSidebar, setShowSidebar] = useState(true);

        const toggleSidebar = () => {
          setShowSidebar(!showSidebar);
        };
    return (
       <div className="flex flex-col md:flex-row">
  {/* Sidebar Button */}
  <button onClick={toggleSidebar} className="fixed px-2 bg-gray-700 text-white rounded ">
    {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
  </button>

  {/* Sidebar */}
  <div className = {showSidebar ? '' : 'hidden'}>
  <Sidebar showSidebar={showSidebar}  />
  </div>
 

  {/* Main Content */}
  <Provider store={store}>
    <main className="flex-1">{children}</main>
  </Provider>
</div>
    )
  }