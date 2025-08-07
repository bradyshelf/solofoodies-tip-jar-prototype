
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold ml-3">Condiciones de uso y contratación</h1>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Aceptación de términos</h2>
            <p className="text-gray-700">
              Al acceder y utilizar SoloFoodies, aceptas estos términos de servicio. 
              Si no estás de acuerdo con alguno de estos términos, no debes usar nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Descripción del servicio</h2>
            <p className="text-gray-700 mb-3">
              SoloFoodies es una plataforma que conecta restaurantes con influencers gastronómicos para 
              facilitar colaboraciones comerciales. Nuestros servicios incluyen:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Creación de perfiles para restaurantes e influencers</li>
              <li>Sistema de búsqueda y descubrimiento</li>
              <li>Gestión de colaboraciones</li>
              <li>Sistema de mensajería</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Responsabilidades del usuario</h2>
            <p className="text-gray-700 mb-3">
              Como usuario de SoloFoodies, te comprometes a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Cumplir con todas las colaboraciones acordadas</li>
              <li>No utilizar la plataforma para actividades ilegales</li>
              <li>Respetar los derechos de otros usuarios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Pagos y suscripciones</h2>
            <p className="text-gray-700">
              Los restaurantes deben mantener una suscripción activa para acceder a todas las funcionalidades. 
              Los pagos se procesan de forma segura y las suscripciones se renuevan automáticamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Limitación de responsabilidad</h2>
            <p className="text-gray-700">
              SoloFoodies actúa como intermediario entre restaurantes e influencers. No somos responsables 
              del cumplimiento de los acuerdos entre usuarios ni de la calidad de las colaboraciones.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Modificaciones</h2>
            <p className="text-gray-700">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Te notificaremos sobre cambios importantes a través de la plataforma.
            </p>
          </section>

          <div className="text-sm text-gray-500 pt-4 border-t">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
