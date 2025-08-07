
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import RestaurantCard from './RestaurantCard';

interface Restaurant {
  id: number;
  name: string;
  instagram: string;
  image: string;
  status: 'Activo' | 'Pausado';
  plan: string;
  canPause: boolean;
}

interface PausedRestaurantsSectionProps {
  restaurants: Restaurant[];
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onReactivate: (id: number) => void;
  onDelete: (id: number) => void;
}

const PausedRestaurantsSection = ({ 
  restaurants, 
  isOpen, 
  onToggle, 
  onReactivate, 
  onDelete 
}: PausedRestaurantsSectionProps) => {
  if (restaurants.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
        <h2 className="text-sm font-medium text-gray-900">Restaurantes pausados</h2>
        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform" />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-3">
        <div className="space-y-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onReactivate={onReactivate}
              onDelete={onDelete}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PausedRestaurantsSection;
