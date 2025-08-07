
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, MapPin, Minus, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FoodieSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collaborationType = location.state?.collaborationType || '';
  const selectedLocations = location.state?.selectedLocations || [];
  
  const [foodieCount, setFoodieCount] = useState(4);

  const handleIncrease = () => {
    setFoodieCount(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (foodieCount > 1) {
      setFoodieCount(prev => prev - 1);
    }
  };

  const handleContinue = () => {
    console.log('Collaboration details:', {
      type: collaborationType,
      locations: selectedLocations,
      foodieCount: foodieCount
    });
    // TODO: Navigate to next step or save collaboration
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations/location', { 
              state: { collaborationType } 
            })} 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">ATRÁS</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Date and Companions Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Fecha</div>
              <div className="flex space-x-2 text-sm text-gray-400">
                <span>L</span>
                <span>M</span>
                <span className="font-semibold text-blue-600">X</span>
                <span>J</span>
                <span>V</span>
                <span>S</span>
                <span>D</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">Dto.</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-xs text-blue-400 ml-1">2</span>
            </div>
            <div className="text-sm text-gray-500">
              + acompañantes
            </div>
          </div>

          {/* Location Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            <Button variant="outline" size="sm" className="rounded-full border-gray-300 text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              Sucursal Barcelona
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-gray-300 text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              Sede Central
            </Button>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            colaborar?
          </h2>
        </div>

        {/* Foodie Counter */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between">
              <button
                onClick={handleDecrease}
                disabled={foodieCount <= 1}
                className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Minus className="w-6 h-6 text-white" />
              </button>
              
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">{foodieCount}</div>
                <div className="text-orange-500 text-sm font-medium">foodies</div>
              </div>
              
              <button
                onClick={handleIncrease}
                className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/collaborations/location', { 
            state: { collaborationType } 
          })} 
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <Button 
          onClick={handleContinue} 
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default FoodieSelectionPage;
