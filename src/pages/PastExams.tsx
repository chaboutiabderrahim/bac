
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, ArrowLeft, Download, Eye, Brain, CheckCircle, Clock, Filter, GraduationCap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// PastExams Component - Archive of official BAC exams with AI assistance
// Allows students to view, download, and solve exams with AI help
const PastExams = () => {
  // State for database data
  const [streams, setStreams] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedStream, setSelectedStream] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch streams
        const { data: streamsData } = await supabase
          .from('bac_streams')
          .select('*')
          .order('name_en');

        // Fetch subjects with stream info
        const { data: subjectsData } = await supabase
          .from('bac_subjects')
          .select(`
            *,
            bac_streams!inner(name_en, name_ar)
          `)
          .order('subject_en');

        // Fetch exams with subject and stream info
        const { data: examsData } = await supabase
          .from('exams')
          .select(`
            *,
            bac_subjects!inner(subject_en, subject_ar, bac_streams!inner(name_en, name_ar))
          `)
          .order('year', { ascending: false });

        setStreams(streamsData || []);
        setSubjects(subjectsData || []);
        setExams(examsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data from database",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get filtered subjects based on selected stream
  const filteredSubjects = selectedStream === "all" 
    ? subjects 
    : subjects.filter(subject => subject.stream_id === parseInt(selectedStream));

  // Get unique years from exams
  const years = [...new Set(exams.map(exam => exam.year.toString()))].sort().reverse();

  // Filter exams based on selected criteria
  const filteredExams = exams.filter(exam => {
    const matchesStream = selectedStream === "all" || 
      exam.bac_subjects.bac_streams.id === parseInt(selectedStream);
    const matchesSubject = selectedSubject === "all" || 
      exam.bac_subjects.id === parseInt(selectedSubject);
    const matchesYear = selectedYear === "all" || exam.year.toString() === selectedYear;
    
    return matchesStream && matchesSubject && matchesYear;
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
      description: `Downloading ${exam.bac_subjects.subject_en} ${exam.year} exam...`,
    });
  };

  const handleSolveWithAI = (exam: any) => {
    toast({
      title: "AI Assistant Activated",
      description: `Starting AI-guided solution for ${exam.bac_subjects.subject_en} ${exam.year}`,
    });
    // In real app, this would navigate to AI-assisted exam solver
  };

  const handleViewExam = (exam: any) => {
    toast({
      title: "Opening Exam",
      description: `Viewing ${exam.title}`,
    });
    // In real app, this would open exam viewer
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading BAC structure...</p>
        </div>
      </div>
    );
  }

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
              <div className="text-2xl font-bold">{exams.length}</div>
              <p className="text-sm text-gray-600">Available for practice</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">BAC Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {streams.length}
              </div>
              <p className="text-sm text-gray-600">Academic tracks</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {subjects.length}
              </div>
              <p className="text-sm text-gray-600">Available subjects</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Years Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {years.length}
              </div>
              <p className="text-sm text-gray-600">Exam years</p>
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
                <label className="text-sm font-medium text-gray-700 mb-1 block">BAC Stream</label>
                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Streams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    {streams.map(stream => (
                      <SelectItem key={stream.id} value={stream.id.toString()}>
                        {stream.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {filteredSubjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.subject_en}
                      </SelectItem>
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
                    <CardTitle className="text-lg">{exam.bac_subjects.subject_en}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>BAC {exam.year}</span>
                      <span>•</span>
                      <span>{exam.exam_type.toUpperCase()}</span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {exam.bac_subjects.bac_streams.name_en}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Badge className={getSubjectColor(exam.bac_subjects.subject_en)}>
                    {exam.bac_subjects.subject_en}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    AI Available
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>Title:</strong> {exam.title}
                  </div>
                  
                  {exam.description && (
                    <div className="text-sm text-gray-600">
                      <strong>Description:</strong> {exam.description}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Year: {exam.year}
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
