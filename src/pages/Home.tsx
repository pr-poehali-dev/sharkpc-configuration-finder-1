import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-gray-900">
            Добро пожаловать в 
            <div className="text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-4">
              SHARK<span className="text-blue-500">PC</span>
            </div>
          </h1>
          <p className="text-center text-xl text-blue-700 max-w-2xl mx-auto">
            Лучший сервис для подбора комплектующих ПК. Создавайте идеальные конфигурации, 
            делитесь сборками и находите лучшие предложения на рынке.
          </p>
          
          <div className="flex justify-center gap-6 mt-12">
            <Button 
              onClick={() => window.location.href = '/configurator'} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              <Icon name="Settings" size={24} className="mr-3" />
              Начать подбор
            </Button>
            <Button 
              onClick={() => window.location.href = '/builds'} 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              <Icon name="Users" size={24} className="mr-3" />
              Сборки сообщества
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <Icon name="Cpu" size={48} className="text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Умный подбор</h3>
              <p className="text-gray-600">ИИ поможет выбрать совместимые комплектующие под ваш бюджет</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <Icon name="Heart" size={48} className="text-purple-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Сборки сообщества</h3>
              <p className="text-gray-600">Делитесь своими конфигурациями и находите вдохновение</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <Icon name="ShoppingCart" size={48} className="text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Лучшие цены</h3>
              <p className="text-gray-600">Сравнение цен по всем популярным маркетплейсам</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}