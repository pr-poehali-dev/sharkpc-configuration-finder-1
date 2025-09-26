import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"
import Icon from '@/components/ui/icon'

interface PCComponent {
  id: string
  name: string
  type: 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'psu' | 'case'
  price: number
  specs: string[]
  compatibility?: string[]
}

interface PCBuild {
  id: string
  name: string
  author: string
  likes: number
  components: { [key: string]: PCComponent }
  totalPrice: number
  isCompatible: boolean
}

const sampleComponents: PCComponent[] = [
  {
    id: '1',
    name: 'Intel Core i7-13700K',
    type: 'cpu',
    price: 35000,
    specs: ['16 ядер', '3.4 ГГц', 'Socket LGA1700'],
    compatibility: ['LGA1700']
  },
  {
    id: '2',
    name: 'AMD Ryzen 7 7700X',
    type: 'cpu',
    price: 32000,
    specs: ['8 ядер', '4.5 ГГц', 'Socket AM5'],
    compatibility: ['AM5']
  },
  {
    id: '3',
    name: 'RTX 4080 Super',
    type: 'gpu',
    price: 85000,
    specs: ['16 ГБ GDDR6X', '320-bit', '2550 МГц'],
    compatibility: []
  },
  {
    id: '4',
    name: 'ASUS ROG Strix Z790-E',
    type: 'motherboard',
    price: 45000,
    specs: ['Socket LGA1700', 'DDR5', 'Wi-Fi 6E'],
    compatibility: ['LGA1700', 'DDR5']
  }
]

const sampleBuilds: PCBuild[] = [
  {
    id: '1',
    name: 'Игровая Мощь 2024',
    author: 'GameMaster',
    likes: 142,
    components: {},
    totalPrice: 180000,
    isCompatible: true
  },
  {
    id: '2',
    name: 'Бюджетный Воин',
    author: 'BudgetGamer',
    likes: 89,
    components: {},
    totalPrice: 95000,
    isCompatible: true
  }
]

const Index = () => {
  const [selectedComponents, setSelectedComponents] = useState<{[key: string]: PCComponent}>({})
  const [builds, setBuilds] = useState(sampleBuilds)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 200000])

  const componentTypes = [
    { key: 'cpu', name: 'Процессор', icon: 'Cpu' },
    { key: 'gpu', name: 'Видеокарта', icon: 'Monitor' },
    { key: 'motherboard', name: 'Материнская плата', icon: 'CircuitBoard' },
    { key: 'ram', name: 'Оперативная память', icon: 'MemoryStick' },
    { key: 'storage', name: 'Накопитель', icon: 'HardDrive' },
    { key: 'psu', name: 'Блок питания', icon: 'Zap' },
    { key: 'case', name: 'Корпус', icon: 'Box' }
  ]

  const checkCompatibility = () => {
    const cpu = selectedComponents.cpu
    const motherboard = selectedComponents.motherboard
    const psu = selectedComponents.psu
    const gpu = selectedComponents.gpu
    const caseComp = selectedComponents.case

    const issues = []

    if (cpu && motherboard) {
      const cpuSocket = cpu.compatibility?.[0]
      const mbSocket = motherboard.compatibility?.[0]
      if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
        issues.push('Процессор не подходит к материнской плате')
      }
    }

    if (gpu && psu) {
      const estimatedPower = 400 + (gpu.price > 50000 ? 300 : 200)
      if (estimatedPower > 650) {
        issues.push('Блок питания слишком слабый для видеокарты')
      }
    }

    if (gpu && caseComp) {
      if (gpu.price > 70000) {
        issues.push('Видеокарта может не поместиться в корпус')
      }
    }

    if (issues.length === 0) {
      toast({
        title: "✅ Совместимость проверена",
        description: "Все компоненты совместимы между собой!",
        duration: 3000,
      })
    } else {
      toast({
        title: "❌ Найдены проблемы",
        description: issues.join('. '),
        duration: 5000,
        variant: "destructive"
      })
    }
  }

  const selectComponent = (component: PCComponent) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.type]: component
    }))
  }

  const removeComponent = (type: string) => {
    setSelectedComponents(prev => {
      const newComponents = { ...prev }
      delete newComponents[type]
      return newComponents
    })
  }

  const filteredComponents = sampleComponents.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    comp.price >= priceRange[0] && comp.price <= priceRange[1]
  )

  const totalPrice = Object.values(selectedComponents).reduce((sum, comp) => sum + comp.price, 0)

  const likeBuild = (buildId: string) => {
    setBuilds(prev => prev.map(build => 
      build.id === buildId 
        ? { ...build, likes: build.likes + 1 }
        : build
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="gamer-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/img/b4f67deb-07c1-4bc1-9073-d0df7fd2b10b.jpg" 
              alt="SharkPC Logo" 
              className="w-16 h-16 mr-4 shark-logo rounded-full"
            />
            <h1 className="text-6xl font-bold">
              SHARK<span className="text-purple-200">PC</span>
            </h1>
          </div>
          <p className="text-center text-xl text-purple-100 max-w-2xl mx-auto">
            Профессиональный конфигуратор игровых ПК с поиском по лучшим маркетплейсам России
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <Tabs defaultValue="configurator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/90 backdrop-blur">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Icon name="Home" size={20} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="configurator" className="flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Конфигуратор
            </TabsTrigger>
            <TabsTrigger value="builds" className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Сборки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            <div className="text-center py-20">
              <h2 className="text-4xl font-bold mb-4">Добро пожаловать в SharkPC</h2>
              <p className="text-xl text-gray-600 mb-8">
                Этот раздел будет содержать приветственную страницу
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Перейти к конфигуратору
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="configurator" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">Конфигуратор ПК</CardTitle>
                    <CardDescription>Выберите компоненты для вашего игрового ПК</CardDescription>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={checkCompatibility} variant="outline">
                      <Icon name="CheckCircle" size={20} className="mr-2" />
                      Проверить совместимость
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Icon name="Search" size={20} className="mr-2" />
                      Найти ПК
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {componentTypes.map(type => (
                  <div key={type.key} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Icon name={type.icon as any} size={24} className="text-primary" />
                      <div>
                        <h3 className="font-semibold">{type.name}</h3>
                        {selectedComponents[type.key] ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{selectedComponents[type.key].name}</span>
                            <Badge variant="secondary">{selectedComponents[type.key].price.toLocaleString()} ₽</Badge>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Не выбрано</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Icon name="Plus" size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Выбор компонента: {type.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <Input
                                  placeholder="Поиск компонентов..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="w-64">
                                <div className="text-sm text-gray-600 mb-2">
                                  Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                                </div>
                                <Slider
                                  value={priceRange}
                                  onValueChange={setPriceRange}
                                  max={200000}
                                  step={5000}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                              {filteredComponents
                                .filter(comp => comp.type === type.key)
                                .map(component => (
                                <Card key={component.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => selectComponent(component)}>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">{component.name}</CardTitle>
                                    <CardDescription className="text-lg font-semibold text-primary">
                                      {component.price.toLocaleString()} ₽
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex flex-wrap gap-1">
                                      {component.specs.map((spec, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {spec}
                                        </Badge>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {selectedComponents[type.key] && (
                        <Button variant="outline" size="sm" onClick={() => removeComponent(type.key)}>
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {Object.keys(selectedComponents).length > 0 && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Итого</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Общая стоимость:</span>
                      <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builds" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Пользовательские сборки</CardTitle>
                <CardDescription>Готовые конфигурации от сообщества</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {builds.map(build => (
                    <Card key={build.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{build.name}</CardTitle>
                            <CardDescription>от {build.author}</CardDescription>
                          </div>
                          <Badge variant={build.isCompatible ? "default" : "destructive"}>
                            {build.isCompatible ? "✓ Совместимо" : "⚠ Проблемы"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-xl font-bold text-primary">
                            {build.totalPrice.toLocaleString()} ₽
                          </div>
                          <div className="flex justify-between items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => likeBuild(build.id)}
                              className="flex items-center gap-2"
                            >
                              <Icon name="Heart" size={16} />
                              {build.likes}
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Просмотр
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Index