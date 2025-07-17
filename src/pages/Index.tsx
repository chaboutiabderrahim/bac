
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Trophy, Users, Video, Calendar, TrendingUp, Brain, Lightbulb, Target, Sparkles, Bot, MessageSquare } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import AnimatedHeader from "@/components/AnimatedHeader";
import AnimatedStatsCards from "@/components/AnimatedStatsCards";
import AnimatedAIAdvice from "@/components/AnimatedAIAdvice";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

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

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 200);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <AnimatedHeader />

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* AI Welcome Section */}
        <div className={`relative mb-8 overflow-hidden rounded-3xl ai-gradient p-8 text-white transition-all duration-700 hover:scale-[1.02] ${showContent ? 'animate-fade-in stagger-1' : ''}`}>
          <div className="absolute top-4 right-4 animate-float">
            <Sparkles className="h-8 w-8 opacity-60" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-2 animate-slide-in-left">Welcome back, Student!</h2>
            <p className="text-blue-100 text-lg mb-4 animate-slide-in-left stagger-2">Your AI-powered BAC preparation journey continues</p>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit animate-scale-in stagger-3">
              <Bot className="h-5 w-5" />
              <span className="text-sm font-medium">AI Assistant Ready</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Daily AI Advice Card */}
        <AnimatedAIAdvice />

        {/* Enhanced Stats Cards */}
        <AnimatedStatsCards />

        {/* Charts Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ${showContent ? 'animate-fade-in-up stagger-4' : ''}`}>
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Subject Performance
              </CardTitle>
              <CardDescription>AI-analyzed performance across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="subject" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Recent Progress
              </CardTitle>
              <CardDescription>Your learning journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Access Section */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${showContent ? 'animate-fade-in-up stagger-5' : ''}`}>
          <Link to="/daily-quiz">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-1 hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Trophy className="h-5 w-5" />
                  Daily Quiz
                </CardTitle>
                <CardDescription>AI-generated personalized quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full ai-gradient text-white hover:scale-105 transition-transform">Start Quiz</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/learn-ai">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-accent/50 hover:-translate-y-1 hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Brain className="h-5 w-5" />
                  Learn with AI
                </CardTitle>
                <CardDescription>Personalized AI tutoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white hover:scale-105 transition-all">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/videos">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-1 hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Video className="h-5 w-5" />
                  Study Videos
                </CardTitle>
                <CardDescription>Curated learning content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full hover:scale-105 transition-transform">Browse Videos</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/students">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-accent/50 hover:-translate-y-1 hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Users className="h-5 w-5" />
                  Success Stories
                </CardTitle>
                <CardDescription>Learn from top achievers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full hover:scale-105 transition-transform">Meet Students</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Exams Summary */}
        <Card className={`glass-effect hover-lift ${showContent ? 'animate-fade-in-up stagger-6' : ''}`}>
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
                <div key={index} className={`flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-105 animate-fade-in-up stagger-${index + 7}`}>
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
      </main>
    </div>
  );
};

export default Index;
