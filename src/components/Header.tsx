import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const tabs = [
    { name: 'Главная', path: '/' },
    { name: 'Конфигуратор', path: '/configurator' },
    { name: 'Сборки', path: '/builds' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SHARK<span className="text-blue-500">PC</span>
          </Link>
          
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`relative px-4 py-2 font-medium transition-colors duration-200 ${
                  location.pathname === tab.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.name}
                {location.pathname === tab.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}