import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CreateCollaborationPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');
  
  const handleContinue = () => {
    if (selectedType) {
      console.log('Selected collaboration type:', selectedType);
      navigate('/collaborations/location', { 
        state: { collaborationType: selectedType } 
      });
    }
  };

  const handleElegirClick = (type: string) => {
    setSelectedType(type);
    navigate('/collaborations/location', { 
      state: { collaborationType: type } 
    });
  };

  return <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/collaborations')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
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

          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>Sede Central</span>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Tipo de colaboración
          </h2>
        </div>

        {/* Collaboration Type Selection */}
        <RadioGroup value={selectedType} onValueChange={setSelectedType} className="space-y-4">
          {/* Public Collaboration */}
          <div className="relative">
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="text-lg font-semibold text-gray-900">
                        Pública
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      Define las condiciones y recibe solicitudes de foodies
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleElegirClick('public')}
                    className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Elegir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Private Collaboration */}
          <div className="relative">
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="text-lg font-semibold text-gray-900">
                        Por invitación
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      Define las condiciones y elige los foodies con los que quieres colaborar
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleElegirClick('private')}
                    className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Elegir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </RadioGroup>

        {/* Note */}
        <p className="text-xs text-gray-500 mt-4 italic">
          *En todo momento puedes volver atrás y editar tu selección
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center">
        <button onClick={() => navigate('/collaborations')} className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <Button onClick={handleContinue} disabled={!selectedType} className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white rotate-180" />
        </Button>
      </div>
    </div>;
};

export default CreateCollaborationPage;
