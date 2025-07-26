import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <Card className="border-destructive/20">
              <CardHeader className="text-center">
                <motion.div 
                  className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </motion.div>
                <CardTitle className="text-destructive">حدث خطأ غير متوقع</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground text-sm">
                  نعتذر، حدث خطأ في التطبيق. يرجى المحاولة مرة أخرى.
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left text-xs bg-muted p-3 rounded">
                    <summary className="cursor-pointer font-medium">تفاصيل الخطأ</summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}
                
                <div className="flex gap-2 justify-center">
                  <Button onClick={this.handleReload} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    إعادة التحميل
                  </Button>
                  <Button onClick={this.handleGoHome} size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    الصفحة الرئيسية
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;