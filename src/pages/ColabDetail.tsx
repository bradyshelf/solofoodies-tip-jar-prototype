import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
const ColabDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();

  // Mock collaboration data - in real app this would come from API
  const colabData = {
    id: 1,
    restaurantName: 'Restaurante de Don Juan',
    type: 'PÚBLICA',
    dates: 'Del 08/12/21 al 27/12/21',
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    guests: '+3 acompañantes',
    price: '50€',
    reference: '#SF1234',
    contact: {
      name: 'Manuel',
      phone: '912 345 678',
      address: 'C/ Marqués del Riscal, 5, 28010, Madrid'
    },
    question: '¿Te interesa esta colaboración?',
    images: ['/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png']
  };
  const handleBack = () => {
    navigate('/dashboard');
  };
  const handleRequestCollaboration = () => {
    // Handle collaboration request logic
    console.log('Requesting collaboration...');
  };
  const handleCancelCollab = () => {
    // Handle collaboration cancellation
    console.log('Cancelling collaboration...');
  };
  return <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="relative">
        <div className="h-16 bg-white">
          {/* Empty header space */}
        </div>
        
        {/* Back button overlay */}
        <button onClick={handleBack} className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full p-2 z-10">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Chat icon overlay */}
        
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Restaurant name */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {colabData.restaurantName}
        </h1>

        {/* Collaboration details */}
        <div className="space-y-4 mb-6">
          {/* Type and price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                {colabData.type}
              </span>
              <span className="text-gray-600 text-sm">{colabData.dates}</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">{colabData.price}</span>
          </div>

          {/* Days of the week */}
          <div className="flex space-x-2">
            {colabData.days.map((day, index) => <div key={index} className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-medium flex items-center justify-center">
                {day}
              </div>)}
          </div>

          {/* Guests and reference */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span>👥</span>
              <span>{colabData.guests}</span>
            </div>
            <span className="text-blue-600">{colabData.reference}</span>
          </div>
        </div>

        {/* Contact information */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center space-x-2 text-gray-700">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{colabData.contact.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{colabData.contact.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{colabData.contact.address}</span>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {colabData.question}
          </h2>
          
          {/* Request collaboration button */}
          <Button onClick={handleRequestCollaboration} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-4">
            <Calendar className="w-5 h-5 mr-2" />
            Solicitar colaboración
          </Button>

          {/* Cancel collaboration link */}
          <button onClick={handleCancelCollab} className="text-gray-500 text-sm underline">
            No me interesa esta colaboración
          </button>
        </div>
      </div>
    </div>;
};
export default ColabDetail;