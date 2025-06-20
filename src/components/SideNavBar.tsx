import { useState, useEffect } from 'react';
import {
  LogIn,
  UserPlus,
  ChevronRight,
  ChevronLeft,
  Map,
  LayoutDashboard,
  MapPin
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from './ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export function NavigationMenuSidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const { user, fetchCurrentUser, logout } = useUserStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/adduser', label: 'User Management', icon: UserPlus },
    { path: '/alldzongkhag', label: 'All Dzongkhags', icon: Map },
    { path: '/allgewog', label: 'All Gewogs', icon: MapPin }
  ];

  const getInitials = (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div
      className={`h-screen transition-all duration-200 
        ${isCollapsed ? 'w-20' : 'w-64'} 
        bg-slate-800 border-r border-slate-700 
        flex flex-col justify-between p-4 shadow-sm`}
    >
      <NavigationMenu className="flex flex-col h-full w-full">
        <NavigationMenuList className="flex flex-col h-full w-full">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <h2 className="text-white text-lg font-bold tracking-tight">Dashboard</h2>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-slate-300 hover:text-white transition"
              >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map(({ path, label, icon: Icon }) => {
              const isActive = activeItem === path;
              return (
                <NavigationMenuItem key={path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition text-sm font-medium 
                        ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}
                        ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                        }`}
                      />
                      {!isCollapsed && label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </nav>

          {/* Footer / User Info */}
          <div className="mt-6">
            {!isCollapsed ? (
              <div className="flex items-center gap-3 p-3 rounded-md bg-slate-700">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {getInitials(user?.name ?? '')}
                </div>
                <div>
                  <p className="text-white text-sm">{user?.name}</p>
                  <p className="text-xs text-emerald-300">{user?.role}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {getInitials(user?.name ?? '')}
                </div>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={logout}
              className="mt-4 w-full flex items-center gap-3 text-sm text-red-500 hover:bg-red-100 rounded-md px-3 py-2 transition"
            >
              <LogIn className="w-4 h-4" />
              {!isCollapsed && 'Logout'}
            </button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
