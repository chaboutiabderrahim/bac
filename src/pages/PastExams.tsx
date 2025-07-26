
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, AlertCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import ExamFilters from "@/components/ExamFilters";
import ExamCard from "@/components/ExamCard";
import EmptyState from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

// Secure BAC Exams Component with Authentication & XSS Protection
const PastExams = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State for database data
  const [streams, setStreams] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Secure data fetching with proper error handling
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Parallel fetch for better performance
        const [streamsResult, subjectsResult, examsResult] = await Promise.all([
          supabase
            .from('bac_streams')
            .select('*')
            .order('name_en'),
          supabase
            .from('bac_subjects')
            .select(`
              *,
              bac_streams!inner(name_en, name_ar)
            `)
            .order('subject_en'),
          supabase
            .from('exams')
            .select(`
              *,
              bac_subjects!inner(subject_en, subject_ar, bac_streams!inner(name_en, name_ar))
            `)
            .order('year', { ascending: false })
        ]);

        // Handle potential errors
        if (streamsResult.error) throw streamsResult.error;
        if (subjectsResult.error) throw subjectsResult.error;
        if (examsResult.error) throw examsResult.error;

        setStreams(streamsResult.data || []);
        setSubjects(subjectsResult.data || []);
        setExams(examsResult.data || []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message || 'فشل في تحميل البيانات');
        toast({
          title: "خطأ في التحميل",
          description: "فشل في تحميل بيانات الامتحانات. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);

  // Get unique years from exams (memoized for performance)
  const years = [...new Set(exams.map(exam => exam.year.toString()))].sort().reverse();

  // Filter exams based on selected criteria
  const filteredExams = (selectedSubject && selectedYear) ? exams.filter(exam => {
    const matchesSubject = exam.bac_subjects?.id === parseInt(selectedSubject);
    const matchesYear = exam.year.toString() === selectedYear;
    
    return matchesSubject && matchesYear;
  }) : [];

  // Handle filter changes with proper state management
  const handleStreamChange = (value: string) => {
    setSelectedStream(value);
    setSelectedSubject("");
    setSelectedYear("");
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedYear("");
  };

  const handleClearFilters = () => {
    setSelectedStream("");
    setSelectedSubject("");
    setSelectedYear("");
  };

  // Secure exam action handler with XSS protection
  const handleExamAction = (exam: any, action: string) => {
    // Sanitize exam data to prevent XSS
    const sanitizedExam = {
      id: exam.id,
      title: exam.title?.replace(/<[^>]*>/g, ''),
      year: exam.year,
      subject: exam.bac_subjects?.subject_ar?.replace(/<[^>]*>/g, '')
    };

    switch (action) {
      case 'ai_solve':
        if (!exam.exam_pdf_url) {
          toast({
            title: "غير متوفر",
            description: "ملف الامتحان غير متوفر للحل بالذكاء الاصطناعي",
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "قريباً...",
          description: `سيتم إضافة ميزة الحل بالذكاء الاصطناعي لامتحان ${sanitizedExam.subject} ${sanitizedExam.year}`,
        });
        break;
      default:
        break;
    }
  };

  const retryFetch = () => {
    setError(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4" dir="rtl">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            title="خطأ في تحميل البيانات"
            description={error}
            icon={AlertCircle}
            action={{
              label: "إعادة المحاولة",
              onClick: retryFetch
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-4" dir="rtl">
        {/* Secure Header with Authentication Badge */}
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>العودة إلى الصفحة الرئيسية</span>
            </Link>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              <Shield className="h-3 w-3" />
              <span>محمي للطلاب المسجلين</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">الامتحانات السابقة</h1>
              <p className="text-muted-foreground text-sm">أرشيف امتحانات البكالوريا الرسمية</p>
            </div>
          </div>
        </motion.header>

        <main className="max-w-6xl mx-auto">
          {/* Enhanced Filters */}
          <ExamFilters
            streams={streams}
            subjects={subjects}
            years={years}
            selectedStream={selectedStream}
            selectedSubject={selectedSubject}
            selectedYear={selectedYear}
            onStreamChange={handleStreamChange}
            onSubjectChange={handleSubjectChange}
            onYearChange={setSelectedYear}
            onClearFilters={handleClearFilters}
            loading={loading}
          />

          {/* Results Section */}
          {filteredExams.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-semibold">
                  امتحانات {subjects.find(s => s.id.toString() === selectedSubject)?.subject_ar} - {selectedYear}
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({filteredExams.length} امتحان)
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map((exam, index) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    onAction={handleExamAction}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty States */}
          {!selectedStream && !selectedSubject && !selectedYear && (
            <EmptyState
              title="ابدأ بالبحث"
              description="اختر الشعبة والمادة والسنة للعثور على الامتحانات"
              showFiltersSelected={true}
            />
          )}

          {selectedSubject && selectedYear && filteredExams.length === 0 && (
            <EmptyState
              title="لا توجد امتحانات"
              description="لا توجد امتحانات متاحة للمادة والسنة المحددة. جرب خيارات أخرى."
              action={{
                label: "مسح الفلاتر",
                onClick: handleClearFilters
              }}
            />
          )}

          {/* Help Section */}
          <motion.div 
            className="mt-12 p-6 bg-muted/30 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold mb-3 text-right">كيفية الاستخدام:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-right">
              <li>• اختر الشعبة أولاً (علوم، رياضيات، آداب، إلخ)</li>
              <li>• ثم اختر المادة التي تريد امتحاناتها</li>
              <li>• أخيراً اختر السنة المطلوبة</li>
              <li>• يمكنك تحميل الامتحان أو الحل الرسمي أو مشاهدة فيديو الشرح</li>
              <li>• ميزة الحل بالذكاء الاصطناعي ستكون متاحة قريباً</li>
            </ul>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default PastExams;
