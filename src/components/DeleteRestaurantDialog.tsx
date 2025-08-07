
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Trash2 } from 'lucide-react';

interface DeleteRestaurantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  restaurantName: string;
}

const DeleteRestaurantDialog = ({ isOpen, onClose, onConfirm, restaurantName }: DeleteRestaurantDialogProps) => {
  const [confirmationText, setConfirmationText] = useState('');
  const confirmationPhrase = 'ELIMINAR';

  const isConfirmationValid = confirmationText === confirmationPhrase;

  const handleConfirm = () => {
    if (isConfirmationValid) {
      onConfirm();
      setConfirmationText('');
    }
  };

  const handleClose = () => {
    setConfirmationText('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Eliminar restaurante</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleClose}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6 text-center">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Warning */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¿Eliminar {restaurantName}?
            </h3>
            <p className="text-sm text-gray-600">
              Esta acción no se puede deshacer
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Se eliminarán todos los datos del restaurante</li>
              <li>• Se cancelará la suscripción inmediatamente</li>
              <li>• Se perderán todas las colaboraciones</li>
              <li>• Esta acción es irreversible</li>
            </ul>
          </div>

          {/* Confirmation Input */}
          <div className="text-left">
            <p className="text-sm text-gray-700 mb-2">
              Para confirmar, escribe <span className="font-semibold text-red-600">{confirmationPhrase}</span> en el campo de abajo:
            </p>
            <Input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Escribe la frase de confirmación"
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!isConfirmationValid}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Eliminar permanentemente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRestaurantDialog;
