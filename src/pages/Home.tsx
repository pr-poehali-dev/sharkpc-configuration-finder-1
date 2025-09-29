import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Icon name="Cpu" size={14} className="text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SharkPC
            </h1>
          </div>
          <p className="text-center text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Один из лучших конфигураторов ПК. Создавайте идеальные конфигурации, делитесь сборками, находите самые дешевые и лучшие предложения на всех популярных маркетплейсах.
          </p>
          
          <div className="flex justify-center gap-6 mt-12">
            <Link to="/configurator">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                <Icon name="Settings" size={20} className="mr-2" />
                Начать сборку
              </Button>
            </Link>
            <Link to="/builds">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                Посмотреть сборки
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Cpu" size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Умный подбор</h3>
              <p className="text-gray-600">
                Автоматическая проверка совместимости компонентов и рекомендации по улучшению конфигурации
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Сообщество</h3>
              <p className="text-gray-600">
                Делитесь своими сборками, изучайте конфигурации других пользователей и находите вдохновение
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="DollarSign" size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Лучшие цены</h3>
              <p className="text-gray-600">
                Сравнение цен на всех популярных маркетплейсах для поиска самых выгодных предложений
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}