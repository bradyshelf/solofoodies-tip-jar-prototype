import { useState } from 'react';
import { 
  Heart, 
  History, 
  Mail, 
  Bell, 
  LogOut,
  Star,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProfileSidebarProps {
  onClose: () => void;
}

const ProfileSidebar = ({ onClose }: ProfileSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Colaboraciones",
      icon: Heart,
      onClick: () => {
        console.log("Navigate to collaborations");
        onClose();
      }
    },
    {
      title: "Historial",
      icon: History,
      onClick: () => {
        console.log("Navigate to history");
        onClose();
      }
    },
    {
      title: "Enviar invitación",
      icon: Mail,
      onClick: () => {
        console.log("Navigate to send invitation");
        onClose();
      }
    },
    {
      title: "Suscripción",
      icon: Bell,
      onClick: () => {
        navigate('/subscription-management');
        onClose();
      }
    }
  ];

  const policyItems = [
    {
      title: "Políticas de privacidad",
      onClick: () => {
        navigate('/privacy-policy');
        onClose();
      }
    },
    {
      title: "Condiciones de uso y contratación",
      onClick: () => {
        navigate('/terms-of-service');
        onClose();
      }
    },
    {
      title: "Política de cookies",
      onClick: () => {
        navigate('/cookie-policy');
        onClose();
      }
    }
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Usuario</h3>
            <p className="text-sm text-gray-500">@usuarioinstagram</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-1">
          {/* Resenas Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between px-3 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="text-base text-gray-900">Reseñas</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-white">
              <DropdownMenuItem 
                onClick={() => {
                  navigate('/reviews/foodie');
                  onClose();
                }}
                className="cursor-pointer"
              >
                Foodie View
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  navigate('/reviews/restaurant');
                  onClose();
                }}
                className="cursor-pointer"
              >
                Restaurant View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="w-full flex items-center px-3 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-base text-gray-900">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Policy Items */}
        <div className="space-y-1">
          {policyItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-sm text-gray-600">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Solofoodies Branding */}
        <div className="mt-6 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">SF</span>
            </div>
            <span className="text-sm font-medium">Solofoodies</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center px-3 py-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-base">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
