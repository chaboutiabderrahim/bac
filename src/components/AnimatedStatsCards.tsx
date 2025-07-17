
import { Trophy, TrendingUp, Brain, Calendar, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  delay: string;
}

const AnimatedStatsCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ quizzes: 0, score: 0, sessions: 0, streak: 0 });

  const stats: StatCard[] = [
    {
      title: "Total Quizzes",
      value: "24",
      subtitle: "+3 this week",
      icon: Trophy,
      gradient: "from-primary to-primary/80",
      delay: "0.1s"
    },
    {
      title: "Average Score",
      value: "85%",
      subtitle: "+5% improvement",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
      delay: "0.2s"
    },
    {
      title: "AI Sessions",
      value: "18",
      subtitle: "Learn with AI",
      icon: Brain,
      gradient: "from-accent to-purple-600",
      delay: "0.3s"
    },
    {
      title: "Study Streak",
      value: "15 days",
      subtitle: "Keep it up!",
      icon: Calendar,
      gradient: "from-orange-500 to-orange-600",
      delay: "0.4s"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Animated counters
  useEffect(() => {
    if (!isVisible) return;

    const animateCounter = (key: keyof typeof counters, target: number, duration: number) => {
      const start = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        setCounters(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Stagger the counter animations
    setTimeout(() => animateCounter('quizzes', 24, 1000), 100);
    setTimeout(() => animateCounter('score', 85, 1200), 300);
    setTimeout(() => animateCounter('sessions', 18, 800), 500);
    setTimeout(() => animateCounter('streak', 15, 900), 700);
  }, [isVisible]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className={`
              bg-gradient-to-br ${stat.gradient} text-white border-0 cursor-pointer
              hover:scale-105 hover:shadow-2xl transition-all duration-500
              ${isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
              }
            `}
            style={{ 
              transitionDelay: isVisible ? stat.delay : '0s',
              backgroundSize: '200% 200%',
              animation: isVisible ? 'gradient-shift 4s ease infinite' : 'none'
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {stat.title}
                <Icon className="h-4 w-4 opacity-80 animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold animate-bounce-in">
                {index === 0 ? counters.quizzes : 
                 index === 1 ? `${counters.score}%` :
                 index === 2 ? counters.sessions :
                 `${counters.streak} days`}
              </div>
              <p className="text-white/80 text-xs animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnimatedStatsCards;
