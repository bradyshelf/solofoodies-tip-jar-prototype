
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';
import PaymentSuccessDialog from './PaymentSuccessDialog';
import { useRestaurants } from '@/contexts/RestaurantContext';

interface PlanSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

const PlanSelectionDialog = ({ isOpen, onClose, restaurantName }: PlanSelectionDialogProps) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const { restaurants, reactivateRestaurant } = useRestaurants();

  const handlePayment = () => {
    // Here you would integrate with your payment system
    console.log('Processing payment for plan:', selectedPlan);
    
    // Find the restaurant by name and reactivate it
    const restaurant = restaurants.find(r => r.name === restaurantName);
    if (restaurant) {
      reactivateRestaurant(restaurant.id);
    }
    
    // Show success dialog after payment
    setShowPaymentSuccess(true);
  };

  const handlePaymentSuccessClose = () => {
    setShowPaymentSuccess(false);
    onClose(); // Close the original dialog as well
  };

  return (
    <>
      <Dialog open={isOpen && !showPaymentSuccess} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Seleccionar plan</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Restaurant info */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <h3 className="font-semibold text-lg">Agregar nuevo restaurante</h3>
              <p className="text-sm text-gray-600">Restaurante: {restaurantName}</p>
            </div>

            {/* Plan selection */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Elige tu plan</p>
              
              <div className="space-y-3">
                {/* Monthly Plan */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPlan === 'monthly' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === 'monthly' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPlan === 'monthly' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <p className="font-medium">Plan Mensual</p>
                        <p className="text-xs text-gray-500">Pago recurrente mensual</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">29€/mes</p>
                    </div>
                  </div>
                </div>

                {/* Annual Plan */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors relative ${
                    selectedPlan === 'annual' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('annual')}
                >
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Ahorra 116€
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === 'annual' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPlan === 'annual' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <p className="font-medium">Pago Único</p>
                        <p className="text-xs text-gray-500">Acceso de por vida</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">232€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Incluye:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Gestión completa del restaurante</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Acceso a todos los foodies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Colaboraciones ilimitadas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Estadísticas detalladas</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handlePayment}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Pagar {selectedPlan === 'monthly' ? '29€/mes' : '232€'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentSuccessDialog
        isOpen={showPaymentSuccess}
        onClose={handlePaymentSuccessClose}
        restaurantName={restaurantName}
        selectedPlan={selectedPlan}
      />
    </>
  );
};

export default PlanSelectionDialog;
