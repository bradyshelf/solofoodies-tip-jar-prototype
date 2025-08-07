import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, MapPin, Users, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const LocationSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collaborationType = location.state?.collaborationType || '';
  
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const locations = [
    {
      id: 'sede-central',
      name: 'Sede Central',
      address: 'Calle Gran Vía, 45',
    },
    {
      id: 'local-valencia',
      name: 'Local Valencia',
      address: 'Calle Colon, 27',
    },
    {
      id: 'sucursal-barcelona',
      name: 'Sucursal Barcelona',
      address: 'Passeig de Gràcia, 92',
    }
  ];

  const handleLocationSelect = (locationId: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations(prev => [...prev, locationId]);
    } else {
      setSelectedLocations(prev => prev.filter(id => id !== locationId));
    }
  };

  const handleContinue = () => {
    if (selectedLocations.length > 0) {
      console.log('Selected locations:', selectedLocations);
      console.log('Collaboration type:', collaborationType);
      navigate('/collaborations/foodies', { 
        state: { 
          collaborationType, 
          selectedLocations 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations/create')} 
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
              <span className="text-xs text-blue-400 ml-1">0</span>
            </div>
            <div className="text-sm text-gray-500">
              + acompañantes
            </div>
          </div>

          <div className="text-sm text-gray-900 font-medium mb-2">Foodies:</div>
          
          {/* Location Filter Tabs */}
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" size="sm" className="rounded-full border-gray-300 text-gray-600">
              Sucursal Barcelona
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-gray-300 text-gray-600">
              Sede Central
            </Button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Seleccione uno o varios restaurantes para esta colaboración
          </p>
        </div>

        {/* Location Selection */}
        <div className="space-y-4">
          {locations.map((location) => (
            <Card 
              key={location.id}
              className="border-gray-200 cursor-pointer transition-all"
              onClick={() => handleLocationSelect(location.id, !selectedLocations.includes(location.id))}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedLocations.includes(location.id)}
                    onCheckedChange={(checked) => handleLocationSelect(location.id, !!checked)}
                    className="w-6 h-6"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/collaborations/create')} 
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <Button 
          onClick={handleContinue} 
          disabled={selectedLocations.length === 0} 
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default LocationSelectionPage;
