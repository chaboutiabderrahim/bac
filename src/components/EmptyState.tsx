import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: {
    label: string;
    onClick: () => void;
  };
  showFiltersSelected?: boolean;
}

const EmptyState = ({ 
  title, 
  description, 
  icon: Icon = BookOpen, 
  action,
  showFiltersSelected = false 
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit"
          >
            <Icon className="h-8 w-8 text-muted-foreground" />
          </motion.div>
          
          <motion.h3 
            className="text-lg font-semibold text-foreground mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground mb-4 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>

          {showFiltersSelected && (
            <motion.p 
              className="text-xs text-accent mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              تأكد من اختيار الشعبة والمادة والسنة
            </motion.p>
          )}
          
          {action && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button onClick={action.onClick} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyState;