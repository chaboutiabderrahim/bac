
import { Brain, Sparkles, Bot, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AnimatedHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navItems = [
    { name: "Daily Quiz", path: "/daily-quiz", delay: "0.1s" },
    { name: "Learn with AI", path: "/learn-ai", delay: "0.2s" },
    { name: "Videos", path: "/videos", delay: "0.3s" },
    { name: "Past Exams", path: "/exams", delay: "0.4s" },
    { name: "Success Stories", path: "/students", delay: "0.5s" }
  ];

  return (
    <header className="glass-effect border-b sticky top-0 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Animated Logo */}
          <div 
            className={`flex items-center space-x-3 transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="relative ai-gradient p-2 rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
              <Brain className="h-8 w-8 text-white animate-float" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                EduAI Platform
              </h1>
              <p className="text-sm text-muted-foreground">AI-Powered Learning</p>
            </div>
          </div>

          {/* Animated Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium
                  hover:scale-105 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}
                `}
                style={{ 
                  transitionDelay: isVisible ? item.delay : '0s',
                  animationDelay: item.delay 
                }}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {item.name}
                <span className={`
                  absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
                  ${activeItem === item.name ? 'w-full' : 'w-0'}
                `} />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-primary/30 rounded-full animate-float" />
        <div className="absolute top-4 right-1/3 w-1 h-1 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-warning-color/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </header>
  );
};

export default AnimatedHeader;
