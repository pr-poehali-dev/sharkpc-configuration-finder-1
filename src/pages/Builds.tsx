import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import FocusInput from '@/components/FocusInput';

interface Build {
  id: string;
  name: string;
  author: string;
  components: Array<{
    category: string;
    name: string;
    price: number;
    brand: string;
  }>;
  totalPrice: number;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

// Моковые данные сборок
const initialBuilds: Build[] = [
  {
    id: 'gaming-beast-2024',
    name: 'Gaming Beast 2024',
    author: 'ProGamer_RU',
    components: [
      { category: 'Процессор', name: 'Intel Core i7-13700K', price: 35000, brand: 'Intel' },
      { category: 'Видеокарта', name: 'RTX 4080', price: 95000, brand: 'NVIDIA' },
      { category: 'Материнская плата', name: 'ASUS ROG Z790-E', price: 35000, brand: 'ASUS' },
      { category: 'Оперативная память', name: 'G.Skill DDR5-6000 32GB', price: 18000, brand: 'G.Skill' },
      { category: 'Накопитель', name: 'Samsung 980 PRO 1TB', price: 8000, brand: 'Samsung' },
      { category: 'Блок питания', name: 'Corsair RM1000x', price: 16000, brand: 'Corsair' },
      { category: 'Корпус', name: 'NZXT H7 Flow', price: 15000, brand: 'NZXT' }
    ],
    totalPrice: 222000,
    likes: 42,
    isLiked: false,
    createdAt: '2024-01-15'
  },
  {
    id: 'budget-office-2024',
    name: 'Бюджетный офисный ПК',
    author: 'OfficeWorker',
    components: [
      { category: 'Процессор', name: 'Intel Core i5-13600K', price: 25000, brand: 'Intel' },
      { category: 'Материнская плата', name: 'ASUS ROG Z790-E', price: 35000, brand: 'ASUS' },
      { category: 'Оперативная память', name: 'Corsair DDR5-5600 32GB', price: 15000, brand: 'Corsair' },
      { category: 'Накопитель', name: 'Samsung 980 PRO 1TB', price: 8000, brand: 'Samsung' },
      { category: 'Блок питания', name: 'Seasonic Focus GX-850', price: 12000, brand: 'Seasonic' },
      { category: 'Корпус', name: 'Fractal Design Define 7', price: 18000, brand: 'Fractal Design' }
    ],
    totalPrice: 113000,
    likes: 28,
    isLiked: true,
    createdAt: '2024-01-20'
  },
  {
    id: 'content-creator-pro',
    name: 'Content Creator Pro',
    author: 'VideoMaker',
    components: [
      { category: 'Процессор', name: 'AMD Ryzen 7 7700X', price: 28000, brand: 'AMD' },
      { category: 'Видеокарта', name: 'RTX 4070 Ti', price: 65000, brand: 'NVIDIA' },
      { category: 'Материнская плата', name: 'MSI X670E CARBON', price: 42000, brand: 'MSI' },
      { category: 'Оперативная память', name: 'G.Skill DDR5-6000 32GB', price: 18000, brand: 'G.Skill' },
      { category: 'Накопитель', name: 'WD Black SN850X 2TB', price: 15000, brand: 'WD' },
      { category: 'Блок питания', name: 'Corsair RM1000x', price: 16000, brand: 'Corsair' },
      { category: 'Корпус', name: 'NZXT H7 Flow', price: 15000, brand: 'NZXT' }
    ],
    totalPrice: 199000,
    likes: 35,
    isLiked: false,
    createdAt: '2024-01-25'
  }
];

export default function Builds() {
  const { buildId } = useParams();
  const navigate = useNavigate();
  const [builds, setBuilds] = useState<Build[]>(initialBuilds);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [buildName, setBuildName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedComponents] = useState(() => {
    // Симуляция выбранных компонентов из конфигуратора
    return [
      { category: 'Процессор', name: 'Intel Core i5-13600K', price: 25000, brand: 'Intel' },
      { category: 'Видеокарта', name: 'RTX 4070 Ti', price: 65000, brand: 'NVIDIA' },
      { category: 'Материнская плата', name: 'ASUS ROG Z790-E', price: 35000, brand: 'ASUS' }
    ];
  });

  // Если есть buildId в URL, показываем конкретную сборку
  useEffect(() => {
    if (buildId) {
      const build = builds.find(b => b.id === buildId);
      if (!build) {
        navigate('/builds');
      }
    }
  }, [buildId, builds, navigate]);

  const handleLike = (buildId: string) => {
    setBuilds(prev => prev.map(build => 
      build.id === buildId 
        ? { 
            ...build, 
            likes: build.isLiked ? build.likes - 1 : build.likes + 1,
            isLiked: !build.isLiked 
          }
        : build
    ));
  };

  const handleCreateBuild = () => {
    if (!buildName.trim() || !authorName.trim()) {
      alert('Заполните все поля');
      return;
    }

    // Проверка на дубликаты
    const isDuplicate = builds.some(build => 
      build.components.length === selectedComponents.length &&
      build.components.every(comp => 
        selectedComponents.some(selected => 
          selected.category === comp.category && selected.name === comp.name
        )
      )
    );

    if (isDuplicate) {
      alert('Такая сборка уже создана');
      const existingBuild = builds.find(build => 
        build.components.length === selectedComponents.length &&
        build.components.every(comp => 
          selectedComponents.some(selected => 
            selected.category === comp.category && selected.name === comp.name
          )
        )
      );
      if (existingBuild) {
        navigate(`/builds/${existingBuild.id}`);
      }
      return;
    }

    const newBuild: Build = {
      id: buildName.toLowerCase().replace(/\s+/g, '-'),
      name: buildName,
      author: authorName,
      components: selectedComponents,
      totalPrice: selectedComponents.reduce((sum, comp) => sum + comp.price, 0),
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBuilds(prev => [newBuild, ...prev]);
    setIsCreateModalOpen(false);
    setBuildName('');
    setAuthorName('');
    navigate(`/builds/${newBuild.id}`);
  };

  // Если показываем конкретную сборку
  if (buildId) {
    const build = builds.find(b => b.id === buildId);
    if (!build) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/builds')}
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад к сборкам
          </Button>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{build.name}</h1>
                <p className="text-gray-600">Автор: {build.author}</p>
                <p className="text-sm text-gray-500">Создано: {build.createdAt}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleLike(build.id)}
                  className={build.isLiked ? 'text-red-600 border-red-600' : ''}
                >
                  <Icon name="Heart" size={20} className={`mr-2 ${build.isLiked ? 'fill-red-600' : ''}`} />
                  {build.likes}
                </Button>
                <div className="text-2xl font-bold text-blue-600">
                  {build.totalPrice.toLocaleString()} ₽
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {build.components.map((component, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">{component.category}</div>
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm text-gray-500">{component.brand}</div>
                    <div className="font-semibold text-blue-600 mt-2">
                      {component.price.toLocaleString()} ₽
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Icon name="ExternalLink" size={20} className="mr-2" />
                Собрать эту конфигурацию
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Основная страница сборок
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Сборки сообщества
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Делитесь своими конфигурациями и находите вдохновение в сборках других пользователей
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить сборку
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Новая сборка</h3>
                  <p className="text-gray-600 text-sm">
                    Сборка которую вы выложите будет состоять из выбранных на данный момент компонентов
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Выбранные компоненты:</h4>
                    {selectedComponents.map((comp, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {comp.category}: {comp.name} - {comp.price.toLocaleString()} ₽
                      </div>
                    ))}
                    <div className="font-semibold mt-2">
                      Итого: {selectedComponents.reduce((sum, comp) => sum + comp.price, 0).toLocaleString()} ₽
                    </div>
                  </div>

                  <FocusInput
                    label="Название сборки"
                    placeholder="Введите название сборки"
                    value={buildName}
                    onSave={setBuildName}
                  />

                  <FocusInput
                    label="Ваше имя"
                    placeholder="Введите ваше имя"
                    value={authorName}
                    onSave={setAuthorName}
                  />

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreateModalOpen(false)}
                      className="flex-1"
                    >
                      Отмена
                    </Button>
                    <Button 
                      onClick={handleCreateBuild}
                      className="flex-1"
                    >
                      Выложить сборку
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {builds.map((build) => (
            <Card key={build.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{build.name}</h3>
                    <p className="text-gray-600 text-sm">от {build.author}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(build.id);
                    }}
                    className={build.isLiked ? 'text-red-600' : 'text-gray-600'}
                  >
                    <Icon name="Heart" size={16} className={`mr-1 ${build.isLiked ? 'fill-red-600' : ''}`} />
                    {build.likes}
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  {build.components.slice(0, 3).map((component, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-gray-600">{component.category}:</span> {component.name}
                    </div>
                  ))}
                  {build.components.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{build.components.length - 3} компонентов
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-blue-600">
                    {build.totalPrice.toLocaleString()} ₽
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/builds/${build.id}`)}
                  >
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}