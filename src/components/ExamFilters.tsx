import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExamFiltersProps {
  streams: any[];
  subjects: any[];
  years: string[];
  selectedStream: string;
  selectedSubject: string;
  selectedYear: string;
  onStreamChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

const ExamFilters = memo(({
  streams,
  subjects,
  years,
  selectedStream,
  selectedSubject,
  selectedYear,
  onStreamChange,
  onSubjectChange,
  onYearChange,
  onClearFilters,
  loading = false
}: ExamFiltersProps) => {
  const filteredSubjects = selectedStream 
    ? subjects.filter(subject => subject.stream_id === parseInt(selectedStream))
    : [];

  const hasFilters = selectedStream || selectedSubject || selectedYear;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-right">
            <Filter className="h-5 w-5" />
            فلترة الامتحانات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stream Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الشعبة</label>
              <Select 
                value={selectedStream} 
                onValueChange={onStreamChange}
                disabled={loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent>
                  {streams.map(stream => (
                    <SelectItem key={stream.id} value={stream.id.toString()}>
                      {stream.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">المادة</label>
              <Select 
                value={selectedSubject} 
                onValueChange={onSubjectChange}
                disabled={!selectedStream || loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر المادة" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.subject_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">السنة</label>
              <Select 
                value={selectedYear} 
                onValueChange={onYearChange}
                disabled={!selectedSubject || loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر السنة" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-sm text-muted-foreground">الفلاتر النشطة:</span>
              {selectedStream && (
                <Badge variant="secondary" className="gap-1">
                  {streams.find(s => s.id.toString() === selectedStream)?.name_ar}
                </Badge>
              )}
              {selectedSubject && (
                <Badge variant="secondary" className="gap-1">
                  {subjects.find(s => s.id.toString() === selectedSubject)?.subject_ar}
                </Badge>
              )}
              {selectedYear && (
                <Badge variant="secondary" className="gap-1">
                  {selectedYear}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-xs h-6 px-2"
              >
                <X className="h-3 w-3 ml-1" />
                مسح الكل
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
});

ExamFilters.displayName = 'ExamFilters';

export default ExamFilters;