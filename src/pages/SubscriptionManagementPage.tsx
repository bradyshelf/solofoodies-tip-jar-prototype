
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '@/contexts/RestaurantContext';
import { useSubscriptionDialogs } from '@/hooks/useSubscriptionDialogs';
import RestaurantCard from '@/components/RestaurantCard';
import PausedRestaurantsSection from '@/components/PausedRestaurantsSection';
import PauseRestaurantDialog from '@/components/PauseRestaurantDialog';
import PlanSelectionDialog from '@/components/PlanSelectionDialog';
import DeleteRestaurantDialog from '@/components/DeleteRestaurantDialog';

const SubscriptionManagementPage = () => {
  const navigate = useNavigate();
  const [pausedRestaurantsOpen, setPausedRestaurantsOpen] = useState(false);
  const { restaurants, pauseRestaurant, deleteRestaurant } = useRestaurants();
  const {
    pauseDialogOpen,
    planSelectionDialogOpen,
    deleteDialogOpen,
    selectedRestaurant,
    openPauseDialog,
    closePauseDialog,
    openPlanSelectionDialog,
    closePlanSelectionDialog,
    openDeleteDialog,
    closeDeleteDialog,
  } = useSubscriptionDialogs();

  const activeRestaurants = restaurants.filter(r => r.status === 'Activo');
  const pausedRestaurants = restaurants.filter(r => r.status === 'Pausado');

  const handleClose = () => {
    navigate('/dashboard');
  };

  const handlePause = (restaurantId: number) => {
    const restaurant = activeRestaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      openPauseDialog({ id: restaurantId, name: restaurant.name });
    }
  };

  const handleConfirmPause = () => {
    if (selectedRestaurant) {
      pauseRestaurant(selectedRestaurant.id);
      setPausedRestaurantsOpen(true);
      closePauseDialog();
    }
  };

  const handleReactivate = (restaurantId: number) => {
    const restaurant = pausedRestaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      openPlanSelectionDialog({ id: restaurantId, name: restaurant.name });
    }
  };

  const handleDelete = (restaurantId: number) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      openDeleteDialog({ id: restaurantId, name: restaurant.name });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedRestaurant) {
      deleteRestaurant(selectedRestaurant.id);
      closeDeleteDialog();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-lg font-semibold text-gray-900">Gestionar suscripciones</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-600">
              Administra las suscripciones de tus restaurantes
            </p>

            {/* Active Restaurants */}
            <div>
              <h2 className="text-sm font-medium text-gray-900 mb-3">Restaurantes activos</h2>
              
              <div className="space-y-3">
                {activeRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onPause={handlePause}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>

            {/* Paused Restaurants */}
            <PausedRestaurantsSection
              restaurants={pausedRestaurants}
              isOpen={pausedRestaurantsOpen}
              onToggle={setPausedRestaurantsOpen}
              onReactivate={handleReactivate}
              onDelete={handleDelete}
            />

            {/* Close Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <PauseRestaurantDialog
        isOpen={pauseDialogOpen}
        onClose={closePauseDialog}
        onConfirm={handleConfirmPause}
        restaurantName={selectedRestaurant?.name || ''}
      />

      <PlanSelectionDialog
        isOpen={planSelectionDialogOpen}
        onClose={closePlanSelectionDialog}
        restaurantName={selectedRestaurant?.name || ''}
      />

      <DeleteRestaurantDialog
        isOpen={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        restaurantName={selectedRestaurant?.name || ''}
      />
    </div>
  );
};

export default SubscriptionManagementPage;
