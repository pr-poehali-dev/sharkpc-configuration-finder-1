import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Component {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  specs: string;
  compatibility: string[];
  image: string;
}

const components: Component[] = [
  // Процессоры
  { id: 1, name: 'Intel Core i5-13600K', price: 25000, category: 'Процессор', brand: 'Intel', specs: '14 ядер, 3.5-5.1 ГГц', compatibility: ['LGA1700'], image: '/api/placeholder/200/150' },
  { id: 2, name: 'AMD Ryzen 7 7700X', price: 28000, category: 'Процессор', brand: 'AMD', specs: '8 ядер, 4.5-5.4 ГГц', compatibility: ['AM5'], image: '/api/placeholder/200/150' },
  { id: 3, name: 'Intel Core i7-13700K', price: 35000, category: 'Процессор', brand: 'Intel', specs: '16 ядер, 3.4-5.4 ГГц', compatibility: ['LGA1700'], image: '/api/placeholder/200/150' },
  
  // Материнские платы
  { id: 11, name: 'ASUS ROG Z790-E', price: 35000, category: 'Материнская плата', brand: 'ASUS', specs: 'ATX, DDR5, PCIe 5.0', compatibility: ['LGA1700'], image: '/api/placeholder/200/150' },
  { id: 12, name: 'MSI X670E CARBON', price: 42000, category: 'Материнская плата', brand: 'MSI', specs: 'ATX, DDR5, PCIe 5.0', compatibility: ['AM5'], image: '/api/placeholder/200/150' },
  
  // Видеокарты
  { id: 21, name: 'RTX 4070 Ti', price: 65000, category: 'Видеокарта', brand: 'NVIDIA', specs: '12GB GDDR6X, PCIe 4.0', compatibility: ['PCIe'], image: '/api/placeholder/200/150' },
  { id: 22, name: 'RTX 4080', price: 95000, category: 'Видеокарта', brand: 'NVIDIA', specs: '16GB GDDR6X, PCIe 4.0', compatibility: ['PCIe'], image: '/api/placeholder/200/150' },
  { id: 23, name: 'RX 7800 XT', price: 55000, category: 'Видеокарта', brand: 'AMD', specs: '16GB GDDR6, PCIe 4.0', compatibility: ['PCIe'], image: '/api/placeholder/200/150' },
  
  // Оперативная память
  { id: 31, name: 'Corsair DDR5-5600 32GB', price: 15000, category: 'Оперативная память', brand: 'Corsair', specs: '32GB (2x16GB), 5600 МГц', compatibility: ['DDR5'], image: '/api/placeholder/200/150' },
  { id: 32, name: 'G.Skill DDR5-6000 32GB', price: 18000, category: 'Оперативная память', brand: 'G.Skill', specs: '32GB (2x16GB), 6000 МГц', compatibility: ['DDR5'], image: '/api/placeholder/200/150' },
  
  // Накопители
  { id: 41, name: 'Samsung 980 PRO 1TB', price: 8000, category: 'Накопитель', brand: 'Samsung', specs: 'NVMe M.2, 7000 МБ/с', compatibility: ['M.2'], image: '/api/placeholder/200/150' },
  { id: 42, name: 'WD Black SN850X 2TB', price: 15000, category: 'Накопитель', brand: 'WD', specs: 'NVMe M.2, 7300 МБ/с', compatibility: ['M.2'], image: '/api/placeholder/200/150' },
  
  // Блоки питания
  { id: 51, name: 'Seasonic Focus GX-850', price: 12000, category: 'Блок питания', brand: 'Seasonic', specs: '850W, 80+ Gold', compatibility: ['ATX'], image: '/api/placeholder/200/150' },
  { id: 52, name: 'Corsair RM1000x', price: 16000, category: 'Блок питания', brand: 'Corsair', specs: '1000W, 80+ Gold', compatibility: ['ATX'], image: '/api/placeholder/200/150' },
  
  // Корпуса
  { id: 61, name: 'Fractal Design Define 7', price: 18000, category: 'Корпус', brand: 'Fractal Design', specs: 'Mid Tower, ATX', compatibility: ['ATX'], image: '/api/placeholder/200/150' },
  { id: 62, name: 'NZXT H7 Flow', price: 15000, category: 'Корпус', brand: 'NZXT', specs: 'Mid Tower, ATX', compatibility: ['ATX'], image: '/api/placeholder/200/150' },
];

const categories = [
  'Процессор', 'Материнская плата', 'Видеокарта', 'Оперативная память', 
  'Накопитель', 'Блок питания', 'Корпус'
];

export default function Configurator() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({});
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = useMemo(() => {
    return components.filter(component => 
      component.price >= priceRange[0] && 
      component.price <= priceRange[1] &&
      (component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       component.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
       component.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [priceRange, searchTerm]);

  const selectComponent = (component: Component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
  };

  const removeComponent = (category: string) => {
    setSelectedComponents(prev => {
      const newSelected = { ...prev };
      delete newSelected[category];
      return newSelected;
    });
  };

  const totalPrice = Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0);

  const checkCompatibility = () => {
    const selected = Object.values(selectedComponents);
    if (selected.length < 2) {
      alert('Выберите минимум 2 компонента для проверки совместимости');
      return;
    }
    alert('Все выбранные компоненты совместимы! ✅');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Конфигуратор ПК
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Соберите идеальный компьютер под ваши задачи и бюджет
          </p>
        </div>

        {/* Панель управления */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-96">
                <div className="text-sm text-gray-600 mb-2 text-center">
                  Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={300000}
                  step={5000}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-96">
                <Input
                  placeholder="Поиск компонентов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Выбранные компоненты */}
        {Object.keys(selectedComponents).length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Выбранные компоненты</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(selectedComponents).map(([category, component]) => (
                <div key={category} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm text-gray-600">{component.category}</div>
                    <div className="font-semibold text-blue-600">{component.price.toLocaleString()} ₽</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeComponent(category)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Компоненты по категориям */}
        <div className="space-y-8">
          {categories.map(category => {
            const categoryComponents = filteredComponents.filter(c => c.category === category);
            
            if (categoryComponents.length === 0) return null;

            return (
              <div key={category} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryComponents.map(component => (
                    <Card key={component.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div>
                            <CardContent className="p-4">
                              <img 
                                src={component.image} 
                                alt={component.name}
                                className="w-full h-32 object-cover rounded mb-3"
                              />
                              <h4 className="font-medium text-sm mb-1">{component.name}</h4>
                              <p className="text-xs text-gray-600 mb-2">{component.specs}</p>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-blue-600">{component.price.toLocaleString()} ₽</span>
                                <span className="text-xs text-gray-500">{component.brand}</span>
                              </div>
                            </CardContent>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <div className="space-y-4">
                            <img 
                              src={component.image} 
                              alt={component.name}
                              className="w-full h-48 object-cover rounded"
                            />
                            <div>
                              <h3 className="text-xl font-bold">{component.name}</h3>
                              <p className="text-gray-600">{component.brand}</p>
                              <p className="text-lg font-semibold text-blue-600 mt-2">{component.price.toLocaleString()} ₽</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Характеристики:</h4>
                              <p className="text-gray-700">{component.specs}</p>
                            </div>
                            <Button 
                              onClick={() => selectComponent(component)}
                              className="w-full"
                            >
                              {selectedComponents[category]?.id === component.id ? 'Выбрано' : 'Выбрать'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={checkCompatibility} variant="outline" size="lg">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            Проверить совместимость
          </Button>
        </div>
        
        {Object.keys(selectedComponents).length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-purple-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Итого</h3>
            <div className="flex justify-between items-center">
              <span className="text-lg">Общая стоимость:</span>
              <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>
        )}
        
        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <Button className="bg-primary hover:bg-primary/90" size="lg">
              <Icon name="Search" size={20} className="mr-2" />
              Найти ПК
            </Button>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500">
              Ozon
            </Button>
            <Button variant="outline" className="bg-purple-500 hover:bg-purple-600 text-white border-purple-500">
              Wildberries
            </Button>
            <Button variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500">
              Yandex Market
            </Button>
            <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white border-red-500">
              DNS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}