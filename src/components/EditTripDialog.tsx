
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Combobox } from '@/components/ui/combobox';
import { getAllCountries, getCitiesForCountry } from '@/data/countriesAndCities';

interface Trip {
  id: number;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface EditTripDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tripData: {
    city: string;
    country: string;
    startDate: string;
    endDate: string;
  }) => void;
  trip: Trip | null;
}

const EditTripDialog = ({ isOpen, onClose, onSubmit, trip }: EditTripDialogProps) => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const allCountries = getAllCountries();
  const availableCities = country ? getCitiesForCountry(country) : [];

  useEffect(() => {
    if (trip) {
      setCountry(trip.country);
      setCity(trip.city);
      setStartDate(new Date(trip.startDate));
      setEndDate(new Date(trip.endDate));
    }
  }, [trip]);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    // Only reset city if it's not available in the new country
    const newCountryCities = getCitiesForCountry(value);
    if (!newCountryCities.includes(city)) {
      setCity('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!city || !country || !startDate || !endDate) {
      return;
    }

    if (startDate > endDate) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin');
      return;
    }

    onSubmit({
      city,
      country,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
  };

  const handleClose = () => {
    setCountry('');
    setCity('');
    setStartDate(undefined);
    setEndDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Viaje</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Combobox
              options={allCountries}
              value={country}
              onValueChange={handleCountryChange}
              placeholder="Seleccionar país"
              searchPlaceholder="Buscar país..."
              emptyMessage="No se encontró el país."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ciudad de destino</Label>
            <Combobox
              options={availableCities}
              value={city}
              onValueChange={setCity}
              placeholder={country ? "Seleccionar ciudad" : "Primero selecciona un país"}
              searchPlaceholder="Buscar ciudad..."
              emptyMessage="No se encontró la ciudad."
              disabled={!country}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha de inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Fecha de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < (startDate || new Date())}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={!city || !country || !startDate || !endDate}
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTripDialog;
