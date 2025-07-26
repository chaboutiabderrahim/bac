
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, ArrowLeft, Download, Eye, Brain, CheckCircle, Clock, Filter, GraduationCap, FileText, Youtube, X } from "lucide-react";
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
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);

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
  const filteredSubjects = selectedStream 
    ? subjects.filter(subject => subject.stream_id === parseInt(selectedStream))
    : [];

  // Get unique years from exams
  const years = [...new Set(exams.map(exam => exam.year.toString()))].sort().reverse();

  // Filter exams based on selected criteria - only show if both subject and year are selected
  const filteredExams = (selectedSubject && selectedYear) ? exams.filter(exam => {
    const matchesSubject = exam.bac_subjects.id === parseInt(selectedSubject);
    const matchesYear = exam.year.toString() === selectedYear;
    
    return matchesSubject && matchesYear;
  }) : [];

  // Handle stream change - reset subject and year
  const handleStreamChange = (value: string) => {
    setSelectedStream(value);
    setSelectedSubject("");
    setSelectedYear("");
  };

  // Handle subject change - reset year
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedYear("");
  };

  // Open modal with exam details
  const openModal = (exam: any) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

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
    <div className="min-h-screen bg-background p-5" dir="rtl">
      {/* Header */}
      <header className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-5 w-5" />
          <span>العودة إلى الصفحة الرئيسية</span>
        </Link>
        <h2 className="text-2xl font-bold text-foreground">الامتحانات السابقة</h2>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* اختيار الشعبة */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">اختر الشعبة:</label>
          <Select value={selectedStream} onValueChange={handleStreamChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- اختر الشعبة --" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              {streams.map(stream => (
                <SelectItem key={stream.id} value={stream.id.toString()}>
                  {stream.name_ar}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* اختيار المادة */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">اختر المادة:</label>
          <Select 
            value={selectedSubject} 
            onValueChange={handleSubjectChange}
            disabled={!selectedStream}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- اختر المادة --" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              {filteredSubjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.subject_ar}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* اختيار السنة */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">اختر السنة:</label>
          <Select 
            value={selectedYear} 
            onValueChange={setSelectedYear}
            disabled={!selectedSubject}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- اختر السنة --" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* قائمة الامتحانات */}
        {filteredExams.length > 0 && (
          <div className="exam-list">
            <h3 className="text-lg font-semibold mb-4">
              امتحانات {filteredExams[0]?.bac_subjects?.subject_ar} - {selectedYear}
            </h3>
            <div className="space-y-2">
              {filteredExams.map((exam) => (
                <Button
                  key={exam.id}
                  onClick={() => openModal(exam)}
                  variant="outline"
                  className="w-full text-right justify-start p-4 h-auto"
                >
                  <span className="mr-2">📄</span>
                  {exam.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* رسالة عدم وجود امتحانات */}
        {selectedSubject && selectedYear && filteredExams.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">لا توجد امتحانات</h3>
            <p className="text-muted-foreground">لا توجد امتحانات متاحة للمادة والسنة المحددة.</p>
          </div>
        )}
      </main>

      {/* النافذة المنبثقة */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-background" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-center">اختر نوع العرض</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button 
              onClick={() => {
                handleViewExam(selectedExam);
                closeModal();
              }}
              variant="outline" 
              className="w-full justify-start"
            >
              <FileText className="h-4 w-4 ml-2" />
              📄 رؤية الامتحان
            </Button>
            
            <Button 
              onClick={() => {
                toast({
                  title: "فتح الحل النموذجي",
                  description: "سيتم فتح الحل النموذجي للوزارة قريباً",
                });
                closeModal();
              }}
              variant="outline" 
              className="w-full justify-start"
            >
              <BookOpen className="h-4 w-4 ml-2" />
              📘 الحل النموذجي (وزارة)
            </Button>
            
            <Button 
              onClick={() => {
                handleSolveWithAI(selectedExam);
                closeModal();
              }}
              variant="outline" 
              className="w-full justify-start"
            >
              <Brain className="h-4 w-4 ml-2" />
              🤖 الحل بالذكاء الاصطناعي
            </Button>
            
            <Button 
              onClick={() => {
                toast({
                  title: "فتح فيديو يوتيوب",
                  description: "سيتم فتح فيديو الشرح قريباً",
                });
                closeModal();
              }}
              variant="outline" 
              className="w-full justify-start"
            >
              <Youtube className="h-4 w-4 ml-2" />
              🎥 فيديو يوتيوب
            </Button>
            
            <Button 
              onClick={closeModal}
              variant="outline" 
              className="w-full justify-start"
            >
              <X className="h-4 w-4 ml-2" />
              ❌ إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PastExams;
