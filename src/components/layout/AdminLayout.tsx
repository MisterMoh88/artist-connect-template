
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Music, 
  Users, 
  Grid, 
  FileVideo, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  HomeIcon,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
    : 'U';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:w-64 bg-card border-r border-border flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center border-b border-border">
          <Link to="/admin" className="flex items-center space-x-2 text-primary px-4">
            <Music size={28} className="text-brand-600" />
            <span className="font-bold text-xl">BkoTube Admin</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-brand-100 text-brand-900' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Grid className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/artistes"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-brand-100 text-brand-900' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Users className="mr-3 h-5 w-5" />
            <span>Artistes</span>
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-brand-100 text-brand-900' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Grid className="mr-3 h-5 w-5" />
            <span>Catégories</span>
          </NavLink>

          <NavLink
            to="/admin/medias"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-brand-100 text-brand-900' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <FileVideo className="mr-3 h-5 w-5" />
            <span>Médias</span>
          </NavLink>

          <NavLink
            to="/admin/parametres"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-brand-100 text-brand-900' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>Paramètres</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-between px-3 py-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'Utilisateur'} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {profile?.full_name || user?.email}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {profile?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                    </span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer w-full flex items-center">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  <span>Retour au site</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
