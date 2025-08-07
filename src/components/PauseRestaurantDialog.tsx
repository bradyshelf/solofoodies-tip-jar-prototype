
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Pause } from 'lucide-react';

interface PauseRestaurantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  restaurantName: string;
}

const PauseRestaurantDialog = ({ isOpen, onClose, onConfirm, restaurantName }: PauseRestaurantDialogProps) => {
  // Calculate the end of current billing period (end of current month)
  const getEndOfBillingPeriod = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return endOfMonth.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pausar restaurante</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6 text-center">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <Pause className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Question */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Pausar {restaurantName}?
            </h3>
          </div>

          {/* Warning Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Perderás acceso el {getEndOfBillingPeriod()}</li>
              <li>• Se cancelará la suscripción mensual</li>
              <li>• Todos los datos se conservarán</li>
              <li>• Podrás reactivarlo cuando quieras</li>
              <li>• Aparecerá en la sección de "Pausados"</li>
            </ul>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-500">
            El restaurante se moverá a la sección de pausados donde podrás reactivarlo o eliminarlo definitivamente.
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Pausar restaurante
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PauseRestaurantDialog;
