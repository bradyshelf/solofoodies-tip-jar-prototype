
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Restaurant {
  id: number;
  name: string;
  instagram: string;
  image: string;
  status: 'Activo' | 'Pausado';
  plan: string;
  canPause: boolean;
}

interface RestaurantContextType {
  restaurants: Restaurant[];
  activeRestaurant: Restaurant | null;
  setActiveRestaurant: (restaurant: Restaurant) => void;
  pauseRestaurant: (restaurantId: number) => void;
  reactivateRestaurant: (restaurantId: number) => void;
  deleteRestaurant: (restaurantId: number) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "Pollos Hermanos",
      instagram: "@UsuarioInstagram",
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png',
      status: 'Activo',
      plan: "Pago único",
      canPause: false
    },
    {
      id: 2,
      name: "McDonalds 2",
      instagram: "@kadjacjo",
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png',
      status: 'Activo',
      plan: "Plan Mensual",
      canPause: true
    },
    {
      id: 3,
      name: "McDonalds",
      instagram: "@cento",
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png',
      status: 'Activo',
      plan: "Plan Mensual",
      canPause: true
    }
  ]);

  const activeRestaurants = restaurants.filter(r => r.status === 'Activo');
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant>(
    activeRestaurants[0] || activeRestaurants[0]
  );

  const pauseRestaurant = (restaurantId: number) => {
    console.log('Pausing restaurant:', restaurantId);
    setRestaurants(prev => prev.map(restaurant => 
      restaurant.id === restaurantId 
        ? { ...restaurant, status: 'Pausado' as const }
        : restaurant
    ));
  };

  const reactivateRestaurant = (restaurantId: number) => {
    console.log('Reactivating restaurant:', restaurantId);
    setRestaurants(prev => prev.map(restaurant => 
      restaurant.id === restaurantId 
        ? { ...restaurant, status: 'Activo' as const }
        : restaurant
    ));
  };

  const deleteRestaurant = (restaurantId: number) => {
    console.log('Deleting restaurant:', restaurantId);
    setRestaurants(prev => prev.filter(restaurant => restaurant.id !== restaurantId));
    
    // If the deleted restaurant was the active one, set a new active restaurant
    if (activeRestaurant?.id === restaurantId) {
      const remainingActive = restaurants.filter(r => r.id !== restaurantId && r.status === 'Activo');
      setActiveRestaurant(remainingActive[0] || null);
    }
  };

  return (
    <RestaurantContext.Provider value={{
      restaurants,
      activeRestaurant,
      setActiveRestaurant,
      pauseRestaurant,
      reactivateRestaurant,
      deleteRestaurant
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};
