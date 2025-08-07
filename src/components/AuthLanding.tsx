
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Users, ArrowRight, Loader2 } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleSelection from './RoleSelection';

type UserRole = 'restaurant' | 'foodie';

const AuthLanding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    signUp,
    signIn,
    user,
    loading: authLoading
  } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if we should start in signup mode
    if (searchParams.get('mode') === 'signup') {
      setIsSignUp(true);
    }
    
    // Check if a role was pre-selected from the homepage
    const roleParam = searchParams.get('role') as UserRole;
    if (roleParam && (roleParam === 'restaurant' || roleParam === 'foodie')) {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (user && !authLoading) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && !selectedRole) {
      // Don't show role selection modal, just return early
      return;
    }

    setLoading(true);
    try {
      if (isSignUp && selectedRole) {
        await signUp(email, password, selectedRole, fullName);
      } else {
        await signIn(email, password);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleSelection(false);
  };

  const handleBottomRoleSelect = (role: UserRole) => {
    if (isSignUp) {
      setSelectedRole(role);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>;
  }

  return <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-xl animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solo Foodies</h1>
          <p className="text-gray-600">Connect. Collaborate. Create.</p>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {isSignUp ? 'Join Solo Foodies' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isSignUp ? 'Create your account to start collaborating' : 'Sign in to your account'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {showRoleSelection ? <RoleSelection onRoleSelect={handleRoleSelect} /> : <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} required={isSignUp} className="h-12" />
                  </div>}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required className="h-12" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required className="h-12" minLength={6} />
                </div>

                {isSignUp && selectedRole && <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Selected role: <span className="font-medium capitalize">{selectedRole}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedRole(null)} className="ml-2 h-auto p-0 text-red-600 hover:text-red-700">
                        Change
                      </Button>
                    </p>
                  </div>}

                <Button type="submit" disabled={loading || (isSignUp && !selectedRole)} className="w-full bg-red-500 hover:bg-red-600 h-12">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>}
                </Button>
              </form>}

            {!showRoleSelection && <>
                {/* Toggle between sign in and sign up */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button type="button" onClick={() => {
                  setIsSignUp(!isSignUp);
                  setSelectedRole(null);
                  setShowRoleSelection(false);
                }} className="ml-2 text-red-600 hover:text-red-700 font-medium hover:underline transition-colors">
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>

                {/* Feature highlights - only shown for signup */}
                {isSignUp && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center mb-4">
                      <p className="text-sm font-medium text-gray-700">Select your account type:</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50 ${selectedRole === 'restaurant' ? 'bg-red-50 ring-2 ring-red-200' : ''}`} onClick={() => handleBottomRoleSelect('restaurant')}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${selectedRole === 'restaurant' ? 'bg-red-500' : 'bg-red-500'}`}>
                          <Utensils className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium">For Restaurants</p>
                        <p className="text-xs text-gray-500">Find Influencers</p>
                      </div>
                      <div className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50 ${selectedRole === 'foodie' ? 'bg-green-50 ring-2 ring-green-200' : ''}`} onClick={() => handleBottomRoleSelect('foodie')}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${selectedRole === 'foodie' ? 'bg-green-500' : 'bg-red-500'}`}>
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium">For Foodies</p>
                        <p className="text-xs text-gray-500">Get Collaborations</p>
                      </div>
                    </div>
                  </div>
                )}
              </>}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>;
};

export default AuthLanding;
