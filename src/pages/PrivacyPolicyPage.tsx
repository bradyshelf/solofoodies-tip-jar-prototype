
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage = () => {
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
          <h1 className="text-xl font-semibold ml-3">Políticas de privacidad</h1>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Información que recopilamos</h2>
            <p className="text-gray-700 mb-3">
              En SoloFoodies, recopilamos información que nos proporcionas directamente cuando:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Creas una cuenta en nuestra plataforma</li>
              <li>Completas tu perfil de restaurante o influencer</li>
              <li>Utilizas nuestros servicios de mensajería</li>
              <li>Participas en colaboraciones</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Cómo utilizamos tu información</h2>
            <p className="text-gray-700 mb-3">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Facilitar conexiones entre restaurantes e influencers</li>
              <li>Procesar pagos y suscripciones</li>
              <li>Mejorar nuestros servicios</li>
              <li>Comunicarnos contigo sobre tu cuenta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Compartir información</h2>
            <p className="text-gray-700">
              No vendemos, intercambiamos ni transferimos tu información personal a terceros sin tu consentimiento, 
              excepto cuando sea necesario para proporcionar nuestros servicios o cuando la ley lo requiera.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Seguridad de datos</h2>
            <p className="text-gray-700">
              Implementamos medidas de seguridad apropiadas para proteger tu información personal contra 
              acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Contacto</h2>
            <p className="text-gray-700">
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en: 
              <span className="font-medium"> privacy@solofoodies.com</span>
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

export default PrivacyPolicyPage;
