
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pause, RotateCcw, Trash } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  instagram: string;
  image: string;
  status: 'Activo' | 'Pausado';
  plan: string;
  canPause: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPause?: (id: number) => void;
  onReactivate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const RestaurantCard = ({ restaurant, onPause, onReactivate, onDelete }: RestaurantCardProps) => {
  const isActive = restaurant.status === 'Activo';
  const hasLifetimeAccess = !restaurant.canPause;

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm">
                {restaurant.name}
              </h3>
              <p className="text-xs text-gray-500">
                {restaurant.instagram}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-1 ${
                    isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-xs text-gray-600">{restaurant.status}</span>
                </div>
                {isActive && (
                  <>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{restaurant.plan}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!hasLifetimeAccess && onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(restaurant.id)}
                className="text-red-600 border-red-300 hover:bg-red-50 text-xs px-2 py-1"
              >
                <Trash className="w-3 h-3" />
              </Button>
            )}

            {isActive && restaurant.canPause && onPause && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPause(restaurant.id)}
                className="text-orange-600 border-orange-300 hover:bg-orange-50 text-xs px-3 py-1"
              >
                <Pause className="w-3 h-3 mr-1" />
                Pausar
              </Button>
            )}
            
            {isActive && !restaurant.canPause && (
              <span className="text-xs text-blue-600 font-medium mr-2">
                Acceso de por vida
              </span>
            )}

            {!isActive && onReactivate && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReactivate(restaurant.id)}
                className="text-green-600 border-green-300 hover:bg-green-50 text-xs px-3 py-1"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reactivar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
