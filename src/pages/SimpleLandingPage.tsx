
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProfileSidebar from '@/components/ProfileSidebar';

const SimpleLandingPage = () => {
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Solo Foodies</h1>
        <Button 
          onClick={() => setShowProfileSidebar(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg"
        >
          Open Profile
        </Button>
      </div>

      {/* Profile Sidebar Overlay */}
      {showProfileSidebar && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowProfileSidebar(false)}
          />
          
          {/* Sidebar */}
          <div className="relative bg-white w-80 h-full shadow-xl">
            <ProfileSidebar onClose={() => setShowProfileSidebar(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleLandingPage;
