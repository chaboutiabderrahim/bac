import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Brain, Trophy, Video, BookOpen, Users, Bot, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Daily Quiz', href: '/daily-quiz', icon: Trophy },
    { name: 'Learn with AI', href: '/learn-ai', icon: Bot },
    { name: 'Videos', href: '/videos', icon: Video },
    { name: 'Past Exams', href: '/exams', icon: BookOpen },
    { name: 'Success Stories', href: '/students', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="ai-gradient p-2 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    EduAI Platform
                  </h2>
                  <p className="text-xs text-muted-foreground">AI-Powered Learning</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Student</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex-1 p-4">
              <nav className="space-y-2">
                <Link 
                  to="/"
                  onClick={() => setOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/') ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                  }`}
                >
                  <Brain className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href) ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Auth Actions */}
            <div className="p-4 border-t">
              {user ? (
                <Button 
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  variant="outline" 
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)}>
                  <Button className="w-full ai-gradient text-white">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;