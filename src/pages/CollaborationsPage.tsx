
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Users, MessageCircle, User, Handshake, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import ProfileSidebar from '@/components/ProfileSidebar';
import { Star, Calendar, Euro } from 'lucide-react';

const CollaborationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useAuth();

  // Mock data for collaborations - only used for foodie view
  const myCollaborations = [
    {
      id: 1,
      restaurantName: 'Kuoko',
      date: '08/12/21',
      time: '21:00',
      status: 'FOODIE QUEDADA',
      completion: 100,
      people: 6,
      image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png'
    },
    {
      id: 2,
      restaurantName: 'Restaurante de Don Juan',
      dateFrom: '08/12/21',
      dateTo: '27/12/21',
      price: '50€',
      people: 3,
      rating: 5,
      image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png'
    }
  ];

  const pendingInvitations = [
    {
      id: 3,
      restaurantName: 'Restaurante de Don Juan',
      dateFrom: '08/12/21',
      dateTo: '27/12/21',
      price: '50€',
      people: 3,
      rating: 5,
      image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png'
    }
  ];

  const discoverCollaborations = [
    {
      id: 4,
      restaurantName: 'Kuoko',
      date: '08/12/21',
      time: '21:00',
      status: 'FOODIE QUEDADA',
      completion: 100,
      people: 6,
      image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png'
    },
    {
      id: 5,
      restaurantName: 'Restaurante de Don Juan',
      dateFrom: '08/12/21',
      dateTo: '27/12/21',
      price: '50€',
      people: 3,
      rating: 5,
      image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png'
    }
  ];

  const CollaborationCard = ({ collab }: { collab: any }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={collab.image} 
            alt={collab.restaurantName}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-3">
            <h3 className="text-white font-semibold text-lg">{collab.restaurantName}</h3>
            {collab.status && (
              <span className="text-blue-400 text-xs font-medium">{collab.status}</span>
            )}
          </div>
        </div>
        
        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-600">
              {collab.date ? (
                <>
                  {collab.date}<br />
                  {collab.time}
                </>
              ) : (
                <>
                  Del {collab.dateFrom}<br />
                  al {collab.dateTo}
                </>
              )}
            </div>
            
            <div className="text-right">
              {collab.completion ? (
                <div className="text-2xl font-bold">{collab.completion}%</div>
              ) : (
                <div className="text-2xl font-bold">{collab.price}</div>
              )}
              
              <div className="flex items-center text-sm text-gray-500">
                {collab.people && (
                  <>
                    <Users className="w-4 h-4 mr-1" />
                    <span>+{collab.people}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleProfileClick = () => {
    setIsProfileSidebarOpen(true);
  };

  // Restaurant Empty State Component
  const RestaurantEmptyState = () => (
    <div className="min-h-screen bg-white pb-24 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">COLABORACIONES</h1>
          <Search className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Mis Colaboraciones Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Mis Colaboraciones (0)</h2>
          
          {/* Empty State Card */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                <p className="text-sm">No has creado ninguna</p>
                <p className="text-sm">colaboración todavía</p>
              </div>
              <button 
                onClick={() => navigate('/collaborations/create')}
                className="text-blue-600 text-sm font-medium"
              >
                + Crear colaboración
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Create Collaboration Button */}
      <div className="fixed bottom-20 left-4 right-4 z-20">
        <Button 
          onClick={() => navigate('/collaborations/create')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-base font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Crear colaboración
        </Button>
      </div>
    </div>
  );

  // Foodie View Component (existing functionality)
  const FoodieView = () => (
    <div className="min-h-screen bg-white pb-24 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">COLABORACIONES</h1>
          <Search className="w-6 h-6 text-gray-400" />
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar colaboraciones"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Mis colaboraciones */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Mis colaboraciones ({myCollaborations.length})</h2>
            <Button variant="ghost" className="text-blue-600 text-sm">Ver todas</Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {myCollaborations.map((collab) => (
              <CollaborationCard key={collab.id} collab={collab} />
            ))}
          </div>
        </div>

        {/* Invitaciones pendientes */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Invitaciones pendientes ({pendingInvitations.length})</h2>
            <Button variant="ghost" className="text-blue-600 text-sm">Ver todas</Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {pendingInvitations.map((collab) => (
              <CollaborationCard key={collab.id} collab={collab} />
            ))}
          </div>
        </div>

        {/* Descubre colaboraciones */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Descubre colaboraciones ({discoverCollaborations.length})</h2>
            <Button variant="ghost" className="text-blue-600 text-sm">Ver todas</Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {discoverCollaborations.map((collab) => (
              <CollaborationCard key={collab.id} collab={collab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Render different views based on user role */}
      {userRole === 'restaurant' ? <RestaurantEmptyState /> : <FoodieView />}

      {/* Bottom Navigation - Fixed at bottom for both roles */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center p-2 text-gray-400"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs mt-1">Explore</span>
          </button>
          <button
            onClick={() => navigate('/collaborations')}
            className="flex flex-col items-center p-2 text-blue-600"
          >
            <Handshake className="w-6 h-6" />
            <span className="text-xs mt-1">Colaboraciones</span>
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="flex flex-col items-center p-2 text-gray-400"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Messages</span>
          </button>
          <button
            onClick={handleProfileClick}
            className="flex flex-col items-center p-2 text-zinc-400"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Profile Sidebar Sheet */}
      <Sheet open={isProfileSidebarOpen} onOpenChange={setIsProfileSidebarOpen}>
        <SheetContent side="right" className="w-80 p-0">
          <ProfileSidebar onClose={() => setIsProfileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CollaborationsPage;
