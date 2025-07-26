import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Brain, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExamCardProps {
  exam: any;
  onAction: (exam: any, action: string) => void;
  index: number;
}

const ExamCard = memo(({ exam, onAction, index }: ExamCardProps) => {
  const { toast } = useToast();

  const handleDownload = (url: string, type: string) => {
    if (!url) {
      toast({
        title: "عذراً",
        description: `هذا ${type} غير متوفر حالياً`,
        variant: "destructive",
      });
      return;
    }
    
    // Security: Validate URL before opening
    try {
      new URL(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      toast({
        title: "خطأ",
        description: "رابط غير صحيح",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/20 h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg text-right leading-7">
                {exam.title}
              </CardTitle>
              <div className="flex gap-2 mt-2 justify-end">
                <Badge variant="secondary" className="text-xs">
                  {exam.year}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {exam.exam_type || 'امتحان رسمي'}
                </Badge>
              </div>
            </div>
          </div>
          {exam.description && (
            <p className="text-sm text-muted-foreground text-right mt-2">
              {exam.description}
            </p>
          )}
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              onClick={() => handleDownload(exam.exam_pdf_url, 'الامتحان')}
              disabled={!exam.exam_pdf_url}
            >
              <FileText className="h-3 w-3 ml-1" />
              الامتحان
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              onClick={() => handleDownload(exam.official_solution_pdf_url, 'الحل الرسمي')}
              disabled={!exam.official_solution_pdf_url}
            >
              <Eye className="h-3 w-3 ml-1" />
              الحل الرسمي
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              onClick={() => onAction(exam, 'ai_solve')}
              disabled={!exam.exam_pdf_url}
            >
              <Brain className="h-3 w-3 ml-1" />
              حل بالذكاء الاصطناعي
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              onClick={() => handleDownload(exam.youtube_url, 'فيديو الشرح')}
              disabled={!exam.youtube_url}
            >
              <Video className="h-3 w-3 ml-1" />
              فيديو
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ExamCard.displayName = 'ExamCard';

export default ExamCard;