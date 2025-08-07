import { useState } from 'react';
import { ChevronDown, Plus, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useRestaurants } from '@/contexts/RestaurantContext';

interface RestaurantSwitcherProps {
  onAddRestaurant: () => void;
  onReactivate?: (restaurantId: number) => void;
}

const RestaurantSwitcher = ({ onAddRestaurant, onReactivate }: RestaurantSwitcherProps) => {
  const { restaurants, activeRestaurant, setActiveRestaurant, reactivateRestaurant } = useRestaurants();
  const [pausedRestaurantsOpen, setPausedRestaurantsOpen] = useState(false);

  const activeRestaurants = restaurants.filter(r => r.status === 'Activo');
  const pausedRestaurants = restaurants.filter(r => r.status === 'Pausado');

  const handleReactivate = (restaurantId: number) => {
    if (onReactivate) {
      onReactivate(restaurantId);
    } else {
      reactivateRestaurant(restaurantId);
    }
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={activeRestaurant?.image}
                  alt={activeRestaurant?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{activeRestaurant?.name}</h3>
                <p className="text-sm text-gray-500">{activeRestaurant?.instagram}</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80 bg-white border border-gray-200 shadow-lg" align="start">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 mb-2 px-2">RESTAURANTES</div>
            
            {/* Active Restaurants */}
            {activeRestaurants.map((restaurant) => (
              <DropdownMenuItem
                key={restaurant.id}
                onClick={() => setActiveRestaurant(restaurant)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{restaurant.name}</div>
                  <div className="text-sm text-gray-500">{restaurant.instagram}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-xs text-gray-600">{restaurant.status}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{restaurant.plan}</span>
                  </div>
                </div>
                {activeRestaurant?.id === restaurant.id && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </DropdownMenuItem>
            ))}
            
            {/* Paused Restaurants Collapsible Section */}
            {pausedRestaurants.length > 0 && (
              <>
                <DropdownMenuSeparator className="my-2" />
                
                <Collapsible open={pausedRestaurantsOpen} onOpenChange={setPausedRestaurantsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
                    <span className="text-sm font-medium text-gray-900">Restaurantes pausados</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform" />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-1">
                      {pausedRestaurants.map((restaurant) => (
                        <div
                          key={restaurant.id}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={restaurant.image}
                              alt={restaurant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{restaurant.name}</div>
                            <div className="text-sm text-gray-500">{restaurant.instagram}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                                <span className="text-xs text-gray-600">Pausado</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReactivate(restaurant.id)}
                            className="text-green-600 border-green-300 hover:bg-green-50 text-xs px-3 py-1"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Reactivar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </>
            )}
            
            <DropdownMenuSeparator className="my-2" />
            
            <DropdownMenuItem
              onClick={onAddRestaurant}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="w-5 h-5 text-gray-500" />
              </div>
              <div className="font-medium text-gray-700">Agregar nuevo restaurante</div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RestaurantSwitcher;
