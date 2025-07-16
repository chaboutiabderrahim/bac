
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, ArrowLeft, Download, Eye, Brain, CheckCircle, Clock, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// PastExams Component - Archive of official BAC exams with AI assistance
// Allows students to view, download, and solve exams with AI help
const PastExams = () => {
  // Filter states
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Mock exam data - in real app this would come from database
  const examData = [
    {
      id: 1,
      subject: "Mathematics",
      year: "2023",
      session: "Principal",
      duration: "4 hours",
      difficulty: "Hard",
      solved: true,
      score: 85,
      aiAvailable: true,
      downloadUrl: "#",
      topics: ["Algebra", "Geometry", "Calculus"]
    },
    {
      id: 2,
      subject: "Physics",
      year: "2023",
      session: "Principal",
      duration: "3 hours",
      difficulty: "Medium",
      solved: false,
      score: null,
      aiAvailable: true,
      downloadUrl: "#",
      topics: ["Mechanics", "Optics", "Electricity"]
    },
    {
      id: 3,
      subject: "Chemistry",
      year: "2023",
      session: "Principal",
      duration: "3 hours",
      difficulty: "Medium",
      solved: true,
      score: 92,
      aiAvailable: true,
      downloadUrl: "#",
      topics: ["Organic Chemistry", "Chemical Reactions"]
    },
    {
      id: 4,
      subject: "Mathematics",
      year: "2022",
      session: "Principal",
      duration: "4 hours",
      difficulty: "Hard",
      solved: false,
      score: null,
      aiAvailable: true,
      downloadUrl: "#",
      topics: ["Functions", "Probability", "Statistics"]
    },
    {
      id: 5,
      subject: "Physics",
      year: "2022",
      session: "Rattrapage",
      duration: "3 hours",
      difficulty: "Easy",
      solved: true,
      score: 78,
      aiAvailable: true,
      downloadUrl: "#",
      topics: ["Waves", "Modern Physics"]
    },
    {
      id: 6,
      subject: "French",
      year: "2023",
      session: "Principal",
      duration: "4 hours",
      difficulty: "Medium",
      solved: false,
      score: null,
      aiAvailable: false,
      downloadUrl: "#",
      topics: ["Literature", "Essay Writing"]
    },
    {
      id: 7,
      subject: "Mathematics",
      year: "2021",
      session: "Principal",
      duration: "4 hours",
      difficulty: "Hard",
      solved: true,
      score: 88,
      aiAvailable: true,
      downloadUrl: "#",
      topics: ["Complex Numbers", "Integrals"]
    },
    {
      id: 8,
      subject: "Chemistry",
      year: "2022",
      session: "Principal",
      duration: "3 hours",
      difficulty: "Medium",
      solved: false,
      score: null,
      aiAvailable: true,
      downloadUrl: "#",
      topics: ["Atomic Structure", "Chemical Bonding"]
    }
  ];

  // Get unique values for filters
  const subjects = [...new Set(examData.map(exam => exam.subject))];
  const years = [...new Set(examData.map(exam => exam.year))].sort().reverse();

  // Filter exams based on selected criteria
  const filteredExams = examData.filter(exam => {
    const matchesSubject = selectedSubject === "all" || exam.subject === selectedSubject;
    const matchesYear = selectedYear === "all" || exam.year === selectedYear;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "solved" && exam.solved) ||
      (selectedStatus === "unsolved" && !exam.solved);
    
    return matchesSubject && matchesYear && matchesStatus;
  });

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get subject color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return 'bg-blue-100 text-blue-800';
      case 'Physics': return 'bg-green-100 text-green-800';
      case 'Chemistry': return 'bg-purple-100 text-purple-800';
      case 'French': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle exam actions
  const handleDownload = (exam: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${exam.subject} ${exam.year} exam...`,
    });
  };

  const handleSolveWithAI = (exam: any) => {
    if (!exam.aiAvailable) {
      toast({
        title: "AI Not Available",
        description: "AI assistance is not available for this exam.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "AI Assistant Activated",
      description: `Starting AI-guided solution for ${exam.subject} ${exam.year}`,
    });
    // In real app, this would navigate to AI-assisted exam solver
  };

  const handleViewExam = (exam: any) => {
    toast({
      title: "Opening Exam",
      description: `Viewing ${exam.subject} ${exam.year} exam`,
    });
    // In real app, this would open exam viewer
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Past BAC Exams</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Official BAC Exam Archive</h2>
          <p className="text-gray-600">
            Access past BAC exams, practice with AI assistance, and track your progress
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{examData.length}</div>
              <p className="text-sm text-gray-600">Available for practice</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {examData.filter(e => e.solved).length}
              </div>
              <p className="text-sm text-gray-600">Completed exams</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(
                  examData.filter(e => e.solved && e.score).reduce((acc, e) => acc + e.score!, 0) /
                  examData.filter(e => e.solved && e.score).length
                )}%
              </div>
              <p className="text-sm text-gray-600">Your performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {examData.filter(e => e.aiAvailable).length}
              </div>
              <p className="text-sm text-gray-600">With AI assistance</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="solved">Solved</SelectItem>
                    <SelectItem value="unsolved">Not Solved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{exam.subject}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>BAC {exam.year}</span>
                      <span>•</span>
                      <span>{exam.session}</span>
                    </CardDescription>
                  </div>
                  {exam.solved && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Badge className={getSubjectColor(exam.subject)}>
                    {exam.subject}
                  </Badge>
                  <Badge className={getDifficultyColor(exam.difficulty)}>
                    {exam.difficulty}
                  </Badge>
                  {exam.aiAvailable && (
                    <Badge className="bg-purple-100 text-purple-800">
                      AI Available
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Duration: {exam.duration}
                  </div>
                  
                  {exam.solved && exam.score && (
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm font-medium text-green-800">Your Score:</span>
                      <span className="text-lg font-bold text-green-600">{exam.score}%</span>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Topics Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {exam.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    onClick={() => handleViewExam(exam)}
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Exam
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => handleDownload(exam)}
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    
                    <Button 
                      onClick={() => handleSolveWithAI(exam)}
                      disabled={!exam.aiAvailable}
                      size="sm"
                      className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <Brain className="h-3 w-3" />
                      AI Help
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more exams.</p>
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Brain className="h-5 w-5" />
              How AI Assistance Works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Step-by-Step Solutions</h4>
                <p className="text-sm">Get detailed explanations for each problem with complete working steps.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Concept Explanations</h4>
                <p className="text-sm">Understand the underlying concepts and theories behind each question.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Performance Analysis</h4>
                <p className="text-sm">Receive personalized feedback and recommendations for improvement.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PastExams;
