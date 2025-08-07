
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface PaymentSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  selectedPlan: string;
}

const PaymentSuccessDialog = ({ isOpen, onClose, restaurantName, selectedPlan }: PaymentSuccessDialogProps) => {
  const planPrice = selectedPlan === 'monthly' ? '29€/mes' : '232€';
  const planName = selectedPlan === 'monthly' ? 'Plan Mensual' : 'Pago Único';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6 text-center px-4 pb-4">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Pago exitoso!</h2>
            <p className="text-sm text-gray-600">
              Tu restaurante {restaurantName} ha sido creado exitosamente
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Restaurante:</span>
                <span className="font-medium">{restaurantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Precio:</span>
                <span className="font-medium">{planPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="text-green-600 font-medium">✓ Pagado</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <p className="text-sm font-medium text-gray-700 mb-2">¿Qué sigue?</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Ya puedes acceder a todas las funciones</li>
              <li>• Explora foodies en tu área</li>
              <li>• Gestiona tu perfil de restaurante</li>
              <li>• Tu próximo pago será el mismo día del próximo mes</li>
            </ul>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            ¡Perfecto, empezar!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
