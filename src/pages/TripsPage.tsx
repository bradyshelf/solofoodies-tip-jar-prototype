
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateTripDialog from '@/components/CreateTripDialog';
import EditTripDialog from '@/components/EditTripDialog';

interface Trip {
  id: number;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const TripsPage = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 1,
      city: 'Barcelona',
      country: 'España',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      isActive: true
    },
    {
      id: 2,
      city: 'Madrid',
      country: 'España',
      startDate: '2024-02-10',
      endDate: '2024-02-15',
      isActive: false
    }
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const handleCreateTrip = (tripData: Omit<Trip, 'id' | 'isActive'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: Math.max(...trips.map(t => t.id), 0) + 1,
      isActive: new Date(tripData.startDate) <= new Date() && new Date() <= new Date(tripData.endDate)
    };
    setTrips([...trips, newTrip]);
    setIsCreateDialogOpen(false);
  };

  const handleEditTrip = (tripData: Omit<Trip, 'id' | 'isActive'>) => {
    if (!selectedTrip) return;
    
    const updatedTrip: Trip = {
      ...tripData,
      id: selectedTrip.id,
      isActive: new Date(tripData.startDate) <= new Date() && new Date() <= new Date(tripData.endDate)
    };
    
    setTrips(trips.map(trip => trip.id === selectedTrip.id ? updatedTrip : trip));
    setIsEditDialogOpen(false);
    setSelectedTrip(null);
  };

  const handleDeleteTrip = (tripId: number) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
  };

  const handleEditClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsEditDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const isCurrentTrip = (trip: Trip) => {
    const now = new Date();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return start <= now && now <= end;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')} 
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Mis Viajes</h1>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Viaje
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {trips.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes viajes registrados
            </h3>
            <p className="text-gray-500 mb-6">
              Registra tus próximos viajes para ser descubierto por restaurantes en otras ciudades
            </p>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Primer Viaje
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {trip.city}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{trip.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCurrentTrip(trip) && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Activo
                        </span>
                      )}
                      <button
                        onClick={() => handleEditClick(trip)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Desde: {formatDate(trip.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Hasta: {formatDate(trip.endDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Trip Dialog */}
      <CreateTripDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateTrip}
      />

      {/* Edit Trip Dialog */}
      <EditTripDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedTrip(null);
        }}
        onSubmit={handleEditTrip}
        trip={selectedTrip}
      />
    </div>
  );
};

export default TripsPage;
