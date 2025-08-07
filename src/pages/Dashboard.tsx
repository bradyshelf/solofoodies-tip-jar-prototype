import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, LogOut, Search, MessageCircle, User, MapPin, Star, Handshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import ProfileSidebar from '@/components/ProfileSidebar';
import RestaurantExploreView from '@/components/RestaurantExploreView';

const Dashboard = () => {
  const {
    user,
    userRole,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explorar');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  // Listen for custom event to open profile sidebar
  useEffect(() => {
    const handleOpenProfileSidebar = () => {
      setIsProfileSidebarOpen(true);
    };

    window.addEventListener('openProfileSidebar', handleOpenProfileSidebar);
    
    return () => {
      window.removeEventListener('openProfileSidebar', handleOpenProfileSidebar);
    };
  }, []);

  // Mock active collaboration data - only for foodie users
  const activeCollaborations = [{
    id: 1,
    restaurantName: 'Restaurante de Don Juan',
    handle: '@restaurantedj',
    image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png',
    rating: 5.0,
    reviewCount: 5,
    address: 'C/ Marqués del Riscal, 5, 28010, Madrid'
  }, {
    id: 2,
    restaurantName: 'Café Central',
    handle: '@cafecentral',
    image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png',
    rating: 4.8,
    reviewCount: 12,
    address: 'Gran Vía, 28, 28013, Madrid'
  }, {
    id: 3,
    restaurantName: 'Bistro Moderno',
    handle: '@bistromoderno',
    image: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png',
    rating: 4.9,
    reviewCount: 8,
    address: 'Calle Serrano, 45, 28001, Madrid'
  }];

  const tabs = [{
    id: 'explorar',
    label: 'EXPLORAR'
  }, {
    id: 'solicitados',
    label: 'SOLICITADOS'
  }, {
    id: 'favoritos',
    label: 'FAVORITOS'
  }];

  const handleColabClick = (collabId: number) => {
    navigate(`/colab/${collabId}`);
  };

  const handleProfileClick = () => {
    setIsProfileSidebarOpen(true);
  };

  // Get the appropriate title and search placeholder based on user role
  const getExploreTitle = () => {
    return userRole === 'restaurant' ? 'Popular Foodies' : 'Popular Restaurants';
  };

  const getSearchPlaceholder = () => {
    return userRole === 'restaurant' ? 'Busca foodies' : 'Busca colaboraciones';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Solo Foodies</span>
              </div>
            </div>
          </div>
        </header>

        {/* Header with tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 pt-4">
            <div className="flex space-x-8">
              {tabs.map(tab => (
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
        <div className="px-4 py-4 pb-24">
          {/* Title and Location */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">{getExploreTitle()}</h1>
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
              placeholder={getSearchPlaceholder()}
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Conditional Content Based on User Role */}
          {userRole === 'restaurant' ? (
            <RestaurantExploreView />
          ) : (
            /* Foodie view - existing collaboration cards */
            <div className="space-y-4">
              {activeCollaborations.map(collab => (
                <Card key={collab.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Restaurant Image */}
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img src={collab.image} alt={collab.restaurantName} className="w-full h-full object-cover" />
                      </div>

                      {/* Restaurant Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-base">
                              {collab.restaurantName}
                            </h3>
                            <p className="text-gray-500 text-xs">{collab.handle}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center mt-1 space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-red-500 text-red-500" />
                              ))}
                              <span className="text-xs text-gray-500">
                                ({collab.reviewCount})
                              </span>
                            </div>
                          </div>

                          {/* Colab Button */}
                          <Button 
                            onClick={() => handleColabClick(collab.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm rounded-full"
                          >
                            Colab
                          </Button>
                        </div>

                        {/* Address */}
                        <div className="flex items-center text-blue-600 text-sm mt-2">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{collab.address}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation - Fixed at bottom for both roles */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex flex-col items-center p-2 text-blue-600"
            >
              <Search className="w-6 h-6" />
              <span className="text-xs mt-1">Explore</span>
            </button>
            <button 
              onClick={() => navigate('/collaborations')} 
              className="flex flex-col items-center p-2 text-gray-400"
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
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
