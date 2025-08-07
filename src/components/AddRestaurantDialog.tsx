import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import PlanSelectionDialog from './PlanSelectionDialog';

interface AddRestaurantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (restaurant: any) => void;
}

const AddRestaurantDialog = ({ isOpen, onClose, onAdd }: AddRestaurantDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    contactPerson: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: ''
  });
  const [showPlanSelection, setShowPlanSelection] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      ...formData,
      location: `${formData.city}, ${formData.country}`,
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png'
    });
    
    // Show plan selection dialog instead of closing immediately
    setShowPlanSelection(true);
  };

  const handlePlanSelectionClose = () => {
    setShowPlanSelection(false);
    // Reset form and close original dialog
    setFormData({ 
      name: '', 
      handle: '', 
      contactPerson: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: ''
    });
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showPlanSelection} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Agregar nuevo restaurante</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">
                Nombre del restaurante <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="McDonald's Centro"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="handle">
                Usuario de Instagram <span className="text-red-500">*</span>
              </Label>
              <Input
                id="handle"
                value={formData.handle}
                onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
                placeholder="mcdonalds_centro"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="contactPerson">
                Persona de contacto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                placeholder="María García"
                required
              />
            </div>
            
            <div>
              <Label className="text-base font-medium">Dirección del restaurante</Label>
            </div>
            
            <div>
              <Label htmlFor="address">
                Calle y número <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Calle Gran Vía, 28"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">
                  Ciudad <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Madrid"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="province">
                  Provincia <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="province"
                  value={formData.province}
                  onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
                  placeholder="Madrid"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">
                  Código postal <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                  placeholder="28013"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="country">
                  País <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="España"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Continuar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <PlanSelectionDialog
        isOpen={showPlanSelection}
        onClose={handlePlanSelectionClose}
        restaurantName={formData.name}
      />
    </>
  );
};

export default AddRestaurantDialog;
