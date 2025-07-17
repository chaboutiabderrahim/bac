
import { Brain, Target, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const AnimatedAIAdvice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState(0);

  const adviceList = [
    {
      title: "Today's AI Study Tip",
      content: "Focus on practice problems in calculus today. Based on your performance, derivatives need more attention. Spend 30 minutes on chain rule exercises.",
      category: "Mathematics"
    },
    {
      title: "Personalized Recommendation",
      content: "Your physics scores show improvement! Try tackling electromagnetic induction problems to solidify your understanding.",
      category: "Physics"
    },
    {
      title: "Study Strategy",
      content: "Consider reviewing French vocabulary for 15 minutes daily. Consistent practice will boost your language retention significantly.",
      category: "Languages"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdvice(prev => (prev + 1) % adviceList.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const advice = adviceList[currentAdvice];

  return (
    <Card 
      className={`
        mb-8 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 
        hover:shadow-xl transition-all duration-700 overflow-hidden relative
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
      `}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-12 -translate-x-12 animate-float" />
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3">
          <div className="relative p-2 bg-accent/20 rounded-lg">
            <Brain className="h-6 w-6 text-accent animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent animate-spin-slow" />
          </div>
          <div className="space-y-1">
            <span 
              className="text-lg transition-all duration-500"
              key={advice.title}
            >
              {advice.title}
            </span>
            <p className="text-sm text-muted-foreground font-normal animate-fade-in">
              {advice.category}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p 
          className="text-foreground/90 leading-relaxed mb-4 transition-all duration-500"
          key={advice.content}
        >
          {advice.content}
        </p>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="ai-gradient text-white hover:scale-105 transition-transform duration-300"
          >
            <Target className="h-4 w-4 mr-2" />
            Start Focused Study
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="hover:scale-105 transition-transform duration-300"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask AI More
          </Button>
        </div>
        
        {/* Progress Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {adviceList.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAdvice ? 'bg-accent scale-125' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedAIAdvice;
