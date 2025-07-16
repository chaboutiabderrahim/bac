
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Trophy, Users, Video, Calendar, TrendingUp } from "lucide-react";

// HomePage Component - Main dashboard showing student progress and navigation
// This is the central hub where students can see their performance and access all features
const Index = () => {
  // Mock data for student progress - in real app this would come from API
  const progressData = [
    { subject: 'Math', score: 85 },
    { subject: 'Physics', score: 78 },
    { subject: 'Chemistry', score: 92 },
    { subject: 'French', score: 88 },
    { subject: 'Arabic', score: 82 },
  ];

  // Recent quiz scores over time - shows learning progression
  const recentScores = [
    { date: '2024-01-01', score: 75 },
    { date: '2024-01-02', score: 82 },
    { date: '2024-01-03', score: 88 },
    { date: '2024-01-04', score: 85 },
    { date: '2024-01-05', score: 92 },
  ];

  // Mock data for completed exams
  const completedExams = [
    { subject: 'Mathematics', year: '2023', score: 85 },
    { subject: 'Physics', year: '2022', score: 78 },
    { subject: 'Chemistry', year: '2023', score: 92 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduAI Platform</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/daily-quiz" className="text-gray-600 hover:text-blue-600 transition-colors">Daily Quiz</Link>
              <Link to="/videos" className="text-gray-600 hover:text-blue-600 transition-colors">Videos</Link>
              <Link to="/exams" className="text-gray-600 hover:text-blue-600 transition-colors">Past Exams</Link>
              <Link to="/students" className="text-gray-600 hover:text-blue-600 transition-colors">Success Stories</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h2>
          <p className="text-gray-600">Track your progress and continue your BAC preparation journey</p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-blue-100 text-xs">+3 this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-green-100 text-xs">+5% improvement</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Exams Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-purple-100 text-xs">3 subjects</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 days</div>
              <p className="text-orange-100 text-xs">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Subject Performance
              </CardTitle>
              <CardDescription>Your average scores across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Quiz Scores
              </CardTitle>
              <CardDescription>Your performance over the last 5 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/daily-quiz">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Trophy className="h-5 w-5" />
                  Daily Quiz
                </CardTitle>
                <CardDescription>Take today's AI-generated quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Quiz</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/videos">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Video className="h-5 w-5" />
                  Study Videos
                </CardTitle>
                <CardDescription>Watch recommended lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Browse Videos</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/exams">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <BookOpen className="h-5 w-5" />
                  Past Exams
                </CardTitle>
                <CardDescription>Practice with real BAC exams</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Exams</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/students">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Users className="h-5 w-5" />
                  Success Stories
                </CardTitle>
                <CardDescription>Learn from top students</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Meet Students</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Completed Exams Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Completed Exams</CardTitle>
            <CardDescription>Your latest exam attempts and scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{exam.subject}</h4>
                    <p className="text-sm text-gray-600">BAC {exam.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{exam.score}%</div>
                    <p className="text-sm text-gray-600">Completed</p>
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
