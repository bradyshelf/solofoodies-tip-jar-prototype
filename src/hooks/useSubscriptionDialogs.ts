
import { useState } from 'react';

interface SelectedRestaurant {
  id: number;
  name: string;
}

export const useSubscriptionDialogs = () => {
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [planSelectionDialogOpen, setPlanSelectionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SelectedRestaurant | null>(null);

  const openPauseDialog = (restaurant: SelectedRestaurant) => {
    setSelectedRestaurant(restaurant);
    setPauseDialogOpen(true);
  };

  const closePauseDialog = () => {
    setPauseDialogOpen(false);
    setSelectedRestaurant(null);
  };

  const openPlanSelectionDialog = (restaurant: SelectedRestaurant) => {
    setSelectedRestaurant(restaurant);
    setPlanSelectionDialogOpen(true);
  };

  const closePlanSelectionDialog = () => {
    setPlanSelectionDialogOpen(false);
    setSelectedRestaurant(null);
  };

  const openDeleteDialog = (restaurant: SelectedRestaurant) => {
    setSelectedRestaurant(restaurant);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedRestaurant(null);
  };

  return {
    // State
    pauseDialogOpen,
    planSelectionDialogOpen,
    deleteDialogOpen,
    selectedRestaurant,
    
    // Actions
    openPauseDialog,
    closePauseDialog,
    openPlanSelectionDialog,
    closePlanSelectionDialog,
    openDeleteDialog,
    closeDeleteDialog,
  };
};
