import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-effect border-2 border-destructive/20">
          <CardHeader className="text-center">
            <motion.div 
              className="mx-auto mb-4 p-3 bg-destructive/10 rounded-xl w-fit"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="h-8 w-8 text-destructive" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-destructive">
              Access Denied
            </CardTitle>
            <CardDescription>
              You don't have permission to access this page
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-center text-muted-foreground">
              <p>Your current role doesn't allow access to this resource.</p>
              <p>Please contact an administrator if you believe this is an error.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => navigate('/')} 
                variant="outline" 
                className="w-full gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back Home
              </Button>
              
              <Button 
                onClick={signOut} 
                variant="secondary" 
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Unauthorized;