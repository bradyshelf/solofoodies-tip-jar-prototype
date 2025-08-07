
import React, { useState } from 'react';
import { Search, MapPin, Star, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('explorar');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock active collaboration data
  const activeCollaborations = [
    {
      id: 1,
      title: 'Free Dinner for Two',
      restaurantName: 'Restaurante Nombre',
      handle: '@idRestaurante',
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png',
      rating: 5.0,
      reviewCount: 5,
      address: 'C/ Marqués del Riscal, 5, 28010, Madrid',
      collaborationType: 'Free Meal',
      partySize: 2,
      value: '€80',
      requirements: 'Instagram post + Story',
      expiresIn: '5 days',
      status: 'Active'
    },
    {
      id: 2,
      title: '50% Off Weekend Brunch',
      restaurantName: 'Café Central',
      handle: '@cafecentral',
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png',
      rating: 4.8,
      reviewCount: 12,
      address: 'Gran Vía, 28, 28013, Madrid',
      collaborationType: 'Discount',
      partySize: 4,
      value: '50% Off',
      requirements: 'TikTok video + Instagram Reel',
      expiresIn: '2 days',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Complimentary Tasting Menu',
      restaurantName: 'Bistro Moderno',
      handle: '@bistromoderno',
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png',
      rating: 4.9,
      reviewCount: 8,
      address: 'Calle Serrano, 45, 28001, Madrid',
      collaborationType: 'Free Meal',
      partySize: 2,
      value: '€120',
      requirements: 'Instagram post + Google Review',
      expiresIn: '1 week',
      status: 'Active'
    },
  ];

  const tabs = [
    { id: 'explorar', label: 'EXPLORAR' },
    { id: 'solicitados', label: 'SOLICITADOS' },
    { id: 'favoritos', label: 'FAVORITOS' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 pt-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Title and Location */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Colaboraciones activas
          </h1>
          <div className="flex items-center text-blue-600 text-sm">
            <span>MADRID</span>
            <div className="ml-2 w-4 h-4 flex items-center justify-center">
              <div className="w-3 h-0.5 bg-blue-600"></div>
              <div className="w-3 h-0.5 bg-blue-600 rotate-90 absolute"></div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Busca colaboraciones"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Active Collaboration Cards */}
        <div className="space-y-4">
          {activeCollaborations.map((collab) => (
            <Card key={collab.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Restaurant Image */}
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={collab.image}
                      alt={collab.restaurantName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Collaboration Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base">
                          {collab.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{collab.restaurantName}</p>
                        <p className="text-gray-500 text-xs">{collab.handle}</p>
                        
                        {/* Rating */}
                        <div className="flex items-center mt-1 space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-red-500 text-red-500"
                            />
                          ))}
                          <span className="text-xs text-gray-500">
                            ({collab.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Colab Button */}
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm rounded-full">
                        Aplicar
                      </Button>
                    </div>

                    {/* Collaboration Details */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center text-green-600">
                          <span className="font-medium">{collab.value}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{collab.partySize} personas</span>
                        </div>
                        <div className="flex items-center text-orange-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{collab.expiresIn}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Requisitos:</span> {collab.requirements}
                      </div>

                      {/* Address */}
                      <div className="flex items-center text-blue-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{collab.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
