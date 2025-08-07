
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Users } from 'lucide-react';

type UserRole = 'restaurant' | 'foodie';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Role</h2>
        <p className="text-gray-600">How would you like to use Solo Foodies?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedRole === 'restaurant' ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          onClick={() => handleRoleSelect('restaurant')}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-6 h-6 text-red-500" />
            </div>
            <CardTitle className="text-lg">Restaurant</CardTitle>
            <CardDescription>
              Find food creators and manage collaborations
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Create collaboration offers</li>
              <li>• Search for food influencers</li>
              <li>• Manage partnerships</li>
              <li>• Track campaign success</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedRole === 'foodie' ? 'ring-2 ring-green-500 bg-green-50' : ''
          }`}
          onClick={() => handleRoleSelect('foodie')}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <CardTitle className="text-lg">Food Creator</CardTitle>
            <CardDescription>
              Discover restaurants and showcase your content
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Browse collaboration opportunities</li>
              <li>• Showcase your portfolio</li>
              <li>• Connect with restaurants</li>
              <li>• Get paid for content</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;
