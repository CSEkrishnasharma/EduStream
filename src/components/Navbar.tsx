import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Menu, X, LogOut, LayoutDashboard, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { logout } from '@/lib/firebase';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, profile, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-bottom border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">EduStream</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">Courses</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="" className="w-8 h-8 rounded-full border border-border" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-sm font-medium hidden lg:inline-block">{profile?.displayName || 'User'}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-bottom border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md">Home</Link>
              <Link to="/courses" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md">Courses</Link>
              <a href="/#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md">About</a>
              <a href="/#testimonials" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md">Reviews</a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md">Contact</a>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-primary hover:bg-secondary rounded-md">
                  Dashboard
                </Link>
              )}
              {user ? (
                <div className="px-3 pt-4">
                  <Button variant="outline" className="w-full gap-2" onClick={() => { logout(); setIsOpen(false); }}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 pt-4">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gap-2">
                      <LogIn className="w-4 h-4" />
                      Login / Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
