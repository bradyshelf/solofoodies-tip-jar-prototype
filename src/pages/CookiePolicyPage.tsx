
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CookiePolicyPage = () => {
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
          <h1 className="text-xl font-semibold ml-3">Política de cookies</h1>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3">¿Qué son las cookies?</h2>
            <p className="text-gray-700">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas 
              un sitio web. Nos ayudan a recordar tus preferencias y mejorar tu experiencia en SoloFoodies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Tipos de cookies que utilizamos</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Cookies esenciales</h3>
                <p className="text-gray-700">
                  Necesarias para el funcionamiento básico de la plataforma, incluyendo autenticación 
                  y seguridad. Estas cookies no se pueden desactivar.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Cookies de rendimiento</h3>
                <p className="text-gray-700">
                  Nos ayudan a entender cómo los usuarios interactúan con nuestra plataforma para 
                  mejorar la funcionalidad y el rendimiento.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Cookies de funcionalidad</h3>
                <p className="text-gray-700">
                  Permiten recordar tus preferencias y configuraciones para ofrecerte una experiencia 
                  más personalizada.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Gestión de cookies</h2>
            <p className="text-gray-700 mb-3">
              Puedes controlar y gestionar las cookies de varias maneras:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>A través de la configuración de tu navegador</li>
              <li>Eliminando las cookies existentes</li>
              <li>Bloqueando cookies de sitios específicos</li>
              <li>Configurando alertas cuando se envíen cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Cookies de terceros</h2>
            <p className="text-gray-700">
              Algunos servicios externos que utilizamos pueden establecer sus propias cookies. 
              Esto incluye servicios de análisis y procesamiento de pagos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Contacto</h2>
            <p className="text-gray-700">
              Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos en: 
              <span className="font-medium"> cookies@solofoodies.com</span>
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

export default CookiePolicyPage;
