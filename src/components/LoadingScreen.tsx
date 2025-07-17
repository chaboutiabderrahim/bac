
import { Brain, Sparkles, Bot } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    "Initializing AI Engine...",
    "Loading Learning Modules...",
    "Preparing Your Dashboard...",
    "Welcome to EduAI!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update phase based on progress
        if (newProgress >= 25 && currentPhase === 0) setCurrentPhase(1);
        if (newProgress >= 50 && currentPhase === 1) setCurrentPhase(2);
        if (newProgress >= 75 && currentPhase === 2) setCurrentPhase(3);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentPhase, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center z-50">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Animated Logo */}
        <div className="relative">
          <div className="ai-gradient p-6 rounded-3xl animate-pulse-slow">
            <Brain className="h-16 w-16 text-white animate-float" />
          </div>
          <div className="absolute -top-2 -right-2 animate-spin-slow">
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce-slow">
            <Bot className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            EduAI Platform
          </h1>
          <p className="text-muted-foreground animate-pulse">AI-Powered Learning Experience</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="bg-muted/30 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full ai-gradient transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">
            {phases[currentPhase]}
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float opacity-20">
          <div className="w-4 h-4 bg-primary rounded-full" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float opacity-30" style={{ animationDelay: '1s' }}>
          <div className="w-3 h-3 bg-accent rounded-full" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float opacity-25" style={{ animationDelay: '2s' }}>
          <div className="w-2 h-2 bg-warning-color rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
