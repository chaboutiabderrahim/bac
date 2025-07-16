
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Trophy, Users, Video, Calendar, TrendingUp, Brain, Lightbulb, Target, Sparkles, Bot, MessageSquare } from "lucide-react";

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
      <header className="glass-effect border-b sticky top-0 z-50">
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Welcome Section */}
        <div className="relative mb-8 overflow-hidden rounded-3xl ai-gradient p-8 text-white">
          <div className="absolute top-4 right-4 animate-float">
            <Sparkles className="h-8 w-8 opacity-60" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-2">Welcome back, Student!</h2>
            <p className="text-blue-100 text-lg mb-4">Your AI-powered BAC preparation journey continues</p>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit">
              <Bot className="h-5 w-5" />
              <span className="text-sm font-medium">AI Assistant Ready</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Daily AI Advice Card */}
        <Card className="mb-8 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
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

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Total Quizzes
                <Trophy className="h-4 w-4 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-primary-foreground/80 text-xs">+3 this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success-color to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Average Score
                <TrendingUp className="h-4 w-4 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">85%</div>
              <p className="text-green-100 text-xs">+5% improvement</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                AI Sessions
                <Brain className="h-4 w-4 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <p className="text-purple-100 text-xs">Learn with AI</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning-color to-orange-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Study Streak
                <Calendar className="h-4 w-4 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15 days</div>
              <p className="text-orange-100 text-xs">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="glass-effect">
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

          <Card className="glass-effect">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/daily-quiz">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Trophy className="h-5 w-5" />
                  Daily Quiz
                </CardTitle>
                <CardDescription>AI-generated personalized quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full ai-gradient text-white">Start Quiz</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/learn-ai">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-accent/50 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Brain className="h-5 w-5" />
                  Learn with AI
                </CardTitle>
                <CardDescription>Personalized AI tutoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/videos">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Video className="h-5 w-5" />
                  Study Videos
                </CardTitle>
                <CardDescription>Curated learning content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Browse Videos</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/students">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-accent/50 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Users className="h-5 w-5" />
                  Success Stories
                </CardTitle>
                <CardDescription>Learn from top achievers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Meet Students</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Exams Summary */}
        <Card className="glass-effect">
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
      </main>
    </div>
  );
};

export default Index;
