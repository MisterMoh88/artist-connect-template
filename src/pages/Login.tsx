
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Music, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous intégreriez votre logique d'authentification
    
    // Simulation d'une erreur pour la démonstration
    if (email === 'error@example.com') {
      setError('Email ou mot de passe incorrect. Veuillez réessayer.');
    } else {
      // Redirection vers la page d'accueil ou le dashboard
      window.location.href = '/';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-brand-50/30">
      <div className="container flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 glass-card p-8 shadow-lg animate-fade-in">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center gap-2 mb-6">
              <Music size={28} className="text-brand-600" />
              <span className="font-bold text-2xl tracking-tight">BkoTube</span>
            </Link>
            <h2 className="text-2xl font-bold">Connexion à votre espace</h2>
            <p className="text-muted-foreground mt-2">
              Accédez à votre plateforme de gestion artistique
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm font-medium">
                  Adresse email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    placeholder="votre@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="block text-sm font-medium">
                    Mot de passe
                  </Label>
                  <Link to="/forgot-password" className="text-sm text-brand-600 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    autoComplete="current-password" 
                    required 
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-sm">
                  Se souvenir de moi
                </Label>
              </div>
            </div>
            
            <div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Vous n'avez pas encore de compte ?{" "}
              <Link to="/artistes#inscription" className="text-brand-600 hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <footer className="py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BkoTube. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
