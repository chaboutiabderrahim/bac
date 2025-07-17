import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Users, Video, Brain, Lightbulb, Target, Sparkles, Bot, MessageSquare } from "lucide-react";
import { AnimatedChartsSection } from "@/components/AnimatedChartsSection";
import { AnimatedStatsCards } from "@/components/AnimatedStatsCards";

const Index = () => {
  // Mock data for student progress
  const progressData = [
    { subject: 'Math', score: 85 },
    { subject: 'Physics', score: 78 },
    { subject: 'Chemistry', score: 92 },
    { subject: 'French', score: 88 },
    { subject: 'Arabic', score: 82 },
  ];

  // Recent quiz scores over time
  const recentScores = [
    { date: '2024-01-01', score: 75 },
    { date: '2024-01-02', score: 82 },
    { date: '2024-01-03', score: 88 },
    { date: '2024-01-04', score: 85 },
    { date: '2024-01-05', score: 92 },
  ];

  // Mock completed exams data
  const completedExams = [
    { subject: 'Mathematics', year: '2023', score: 85 },
    { subject: 'Physics', year: '2022', score: 78 },
    { subject: 'Chemistry', year: '2023', score: 92 },
  ];

  // Daily AI advice
  const dailyAdvice = {
    title: "Today's AI Study Tip",
    content: "Focus on practice problems in calculus today. Based on your performance, derivatives need more attention. Spend 30 minutes on chain rule exercises.",
    icon: Brain,
    category: "Mathematics"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Enhanced Header with AI Branding */}
      <motion.header 
        className="glass-effect border-b sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="ai-gradient p-2 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  EduAI Platform
                </h1>
                <p className="text-sm text-muted-foreground">AI-Powered Learning</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/daily-quiz" className="text-foreground/80 hover:text-primary transition-colors font-medium">Daily Quiz</Link>
              <Link to="/learn-ai" className="text-foreground/80 hover:text-accent transition-colors font-medium">Learn with AI</Link>
              <Link to="/videos" className="text-foreground/80 hover:text-primary transition-colors font-medium">Videos</Link>
              <Link to="/exams" className="text-foreground/80 hover:text-primary transition-colors font-medium">Past Exams</Link>
              <Link to="/students" className="text-foreground/80 hover:text-primary transition-colors font-medium">Success Stories</Link>
            </nav>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Welcome Section */}
        <motion.div 
          className="relative mb-8 overflow-hidden rounded-3xl ai-gradient animate-gradient p-8 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute top-4 right-4"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Sparkles className="h-8 w-8 opacity-60" />
          </motion.div>
          <div className="relative z-10">
            <motion.h2 
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome back, Student!
            </motion.h2>
            <motion.p 
              className="text-blue-100 text-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Your AI-powered BAC preparation journey continues
            </motion.p>
            <motion.div 
              className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="h-5 w-5" />
              </motion.div>
              <span className="text-sm font-medium">AI Assistant Ready</span>
            </motion.div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
        </motion.div>

        {/* Daily AI Advice Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        >
          <Card className="mb-8 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 hover-lift glow-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <dailyAdvice.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <span className="text-lg">{dailyAdvice.title}</span>
                  <p className="text-sm text-muted-foreground font-normal">{dailyAdvice.category}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed">{dailyAdvice.content}</p>
              <div className="mt-4 flex items-center gap-2">
                <Button size="sm" className="ai-gradient text-white">
                  <Target className="h-4 w-4 mr-2" />
                  Start Focused Study
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <AnimatedStatsCards />

        {/* Charts Section */}
        <AnimatedChartsSection 
          progressData={progressData}
          recentScores={recentScores}
        />

        {/* Enhanced Quick Access Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { to: "/daily-quiz", title: "Daily Quiz", desc: "AI-generated personalized quiz", icon: Trophy, color: "primary" },
            { to: "/learn-ai", title: "Learn with AI", desc: "Personalized AI tutoring sessions", icon: Brain, color: "accent" },
            { to: "/videos", title: "Study Videos", desc: "Curated learning content", icon: Video, color: "primary" },
            { to: "/students", title: "Success Stories", desc: "Learn from top achievers", icon: Users, color: "accent" }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: 0.8 + (index * 0.1), 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Link to={item.to}>
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 h-full">
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 text-${item.color}`}>
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full ai-gradient text-white">Start</Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Exams Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recently Completed Exams
              </CardTitle>
              <CardDescription>Your latest exam attempts and AI feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedExams.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{exam.subject}</h4>
                        <p className="text-sm text-muted-foreground">BAC {exam.year}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{exam.score}%</div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
