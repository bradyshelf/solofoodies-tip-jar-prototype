import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  baseAmount: number;
}

const TipDialog = ({ isOpen, onClose, baseAmount }: TipDialogProps) => {
  const [selectedTip, setSelectedTip] = useState<'15' | '20' | '25' | 'custom' | 'none' | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [signature, setSignature] = useState('');

  const tipOptions = [
    { percentage: '15', amount: (baseAmount * 0.15).toFixed(2) },
    { percentage: '20', amount: (baseAmount * 0.20).toFixed(2) },
    { percentage: '25', amount: (baseAmount * 0.25).toFixed(2) }
  ];

  const handleTipSelect = (tipType: '15' | '20' | '25' | 'custom' | 'none') => {
    setSelectedTip(tipType);
    if (tipType !== 'custom') {
      setCustomAmount('');
    }
  };

  const handleSubmit = () => {
    // Handle tip submission logic here
    console.log('Tip submitted:', { selectedTip, customAmount, signature });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Full Autonomy</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Amount Display */}
          <div className="text-center">
            <span className="text-3xl font-bold">${baseAmount.toFixed(2)}</span>
          </div>

          {/* Tip Percentage Options */}
          <div className="grid grid-cols-3 gap-3">
            {tipOptions.map((option) => (
              <Button
                key={option.percentage}
                variant={selectedTip === option.percentage ? "default" : "outline"}
                className="h-20 flex flex-col space-y-1"
                onClick={() => handleTipSelect(option.percentage as '15' | '20' | '25')}
              >
                <span className="text-lg font-semibold text-blue-500">
                  {option.percentage}%
                </span>
                <span className="text-sm text-gray-600">
                  ${option.amount}
                </span>
              </Button>
            ))}
          </div>

          {/* Custom Tip and No Tip Options */}
          <div className="space-y-2">
            <Button
              variant={selectedTip === 'custom' ? "default" : "outline"}
              className={`w-full h-12 ${
                selectedTip === 'custom' 
                  ? 'border-2 border-yellow-400 bg-yellow-50 text-blue-500' 
                  : 'border-gray-200'
              }`}
              onClick={() => handleTipSelect('custom')}
            >
              <span className={selectedTip === 'custom' ? 'text-blue-500 font-medium' : ''}>
                Custom Tip
              </span>
            </Button>

            {selectedTip === 'custom' && (
              <div className="px-2">
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            <Button
              variant={selectedTip === 'none' ? "default" : "outline"}
              className="w-full h-12"
              onClick={() => handleTipSelect('none')}
            >
              <span className={selectedTip === 'none' ? 'text-blue-500 font-medium' : ''}>
                No Tip
              </span>
            </Button>
          </div>

          {/* Signature Section */}
          <div className="space-y-2">
            <p className="text-center text-gray-500">Please sign here</p>
            <div className="border-b-2 border-gray-300 pb-2">
              <Input
                placeholder="Your signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="border-0 border-b border-gray-300 rounded-none focus:ring-0 text-center"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedTip || (selectedTip === 'custom' && !customAmount)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Confirm Tip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipDialog;