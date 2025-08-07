
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const invoices = [
    { month: 'Abril 2022', date: '2022-04-01' },
    { month: 'Marzo 2022', date: '2022-03-01' },
    { month: 'Febrero 2022', date: '2022-02-01' },
  ];

  const handleBackClick = () => {
    // Navigate back to dashboard and trigger profile sidebar open
    navigate('/dashboard');
    // Use a small delay to ensure the navigation completes before triggering the sidebar
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('openProfileSidebar'));
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-semibold">ATRÁS</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Subscription Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Suscripción</h2>
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Plan básico</h3>
                  <p className="text-sm text-gray-300">49€/mes</p>
                </div>
                <div className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                  Activo
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Information */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Mis datos de facturación</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">NOMBRE</p>
                <p className="text-gray-900">Nombre o razón social</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">CIF</p>
                <p className="text-gray-900">123456789</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">DIRECCIÓN</p>
                <p className="text-gray-900">Calle Gran Vía, 123, Madrid</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">TELÉFONO</p>
                <p className="text-gray-900">987654321</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">CORREO ELECTRÓNICO</p>
                <p className="text-gray-900">email@domain.com</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Mis facturas</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Ver todas
            </Button>
          </div>
          
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <Card key={invoice.month}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{invoice.month}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Unsubscribe Button */}
        <div className="pt-6">
          <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
            Darme de baja
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
