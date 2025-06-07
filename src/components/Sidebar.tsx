
import React from 'react';
import { Home, Search, User, List, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: User, label: 'Subscriptions', path: '/subscriptions' },
    { icon: List, label: 'Library', path: '/library' },
  ];

  const categories = [
    { label: 'Music', path: '/category/music' },
    { label: 'Gaming', path: '/category/gaming' },
    { label: 'News', path: '/category/news' },
    { label: 'Sports', path: '/category/sports' },
    { label: 'Technology', path: '/category/technology' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:w-20"
      )}>
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Main Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-6 h-10",
                    !isOpen && "lg:justify-center lg:px-2"
                  )}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {(isOpen || window.innerWidth < 1024) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="border-t mx-4 my-4" />

          {/* Categories */}
          {(isOpen || window.innerWidth < 1024) && (
            <nav className="px-4 space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-3 py-2">
                Categories
              </h3>
              {categories.map((category) => (
                <Button
                  key={category.path}
                  variant="ghost"
                  className="w-full justify-start gap-6 h-10"
                  onClick={() => handleNavigation(category.path)}
                >
                  <span className="truncate">{category.label}</span>
                </Button>
              ))}
            </nav>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
