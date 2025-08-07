
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, MessageSquare } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';

const FoodieProfilePage = () => {
  const navigate = useNavigate();
  const { foodieId } = useParams();

  // Mock foodie data - in a real app, this would be fetched based on foodieId
  const foodieData = {
    id: 1,
    name: 'C Williamson',
    handle: '@CameronWilliamson',
    image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png',
    followers: '13k',
    engagement: '2,15%',
    colabs: '14',
    juntos: '3',
    rating: 5,
    location: 'Foodie madrileño',
    description: 'Buscando los mejores restaurantes de Madrid',
    collaborationsCount: 0
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleColaborarClick = () => {
    console.log('Colaborar with foodie:', foodieId);
    // Here you would implement the collaboration logic
  };

  const handleMessageClick = () => {
    console.log('Message foodie:', foodieId);
    navigate(`/chat/${foodieId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-semibold">ATRÁS</h1>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              {/* Profile Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img 
                  src={foodieData.image} 
                  alt={foodieData.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{foodieData.handle}</h2>
                <p className="text-gray-600 text-sm mb-2">{foodieData.name}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                  <span className="text-sm text-gray-500">({foodieData.rating})</span>
                </div>
              </div>
            </div>

            {/* Heart Icon */}
            <Button variant="ghost" size="sm" className="text-red-500">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 text-center mb-6">
            <div>
              <div className="font-semibold text-gray-900 text-lg">{foodieData.followers}</div>
              <div className="text-xs text-gray-500">followers</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-lg">{foodieData.engagement}</div>
              <div className="text-xs text-gray-500">Engagement</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-lg">{foodieData.colabs}</div>
              <div className="text-xs text-gray-500">Colabs</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-lg">{foodieData.juntos}</div>
              <div className="text-xs text-gray-500">Juntos</div>
            </div>
          </div>

          {/* Location and Description */}
          <div className="mb-6">
            <p className="text-sm text-orange-600 mb-1">📍 {foodieData.location}</p>
            <p className="text-sm text-gray-600">{foodieData.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              onClick={handleColaborarClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full flex-1"
            >
              Colaborar
            </Button>
            <Button
              onClick={handleMessageClick}
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full border-green-500 text-green-500 hover:bg-green-50"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full border-gray-300"
            >
              <div className="w-6 h-6 bg-gray-800 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">@</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Collaborations Section */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Colaboraciones realizadas</h3>
          
          {foodieData.collaborationsCount === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm mb-4">No has colaborado aún con<br />este foodie</p>
              <Button 
                variant="ghost" 
                className="text-blue-600 text-sm"
                onClick={handleColaborarClick}
              >
                + Colaborar juntos
              </Button>
            </div>
          ) : (
            <div>
              {/* Future: Display collaboration history */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodieProfilePage;
