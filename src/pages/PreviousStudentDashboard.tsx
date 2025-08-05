import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Calendar, LogOut, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PDF {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  created_at: string;
}

interface Schedule {
  id: string;
  title: string;
  description: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
}

const PreviousStudentDashboard = () => {
  const { userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    file: null as File | null
  });

  useEffect(() => {
    if (userProfile) {
      fetchPDFs();
      fetchSchedules();
    }
  }, [userProfile]);

  const fetchPDFs = async () => {
    try {
      const { data, error } = await supabase
        .from('student_pdfs')
        .select('*')
        .eq('student_id', userProfile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPdfs(data || []);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      toast({
        title: "Error",
        description: "Failed to load your PDFs",
        variant: "destructive",
      });
    }
  };

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('teaching_schedules')
        .select('*')
        .eq('student_id', userProfile?.id)
        .eq('is_active', true)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast({
        title: "Error",
        description: "Failed to load your teaching schedule",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title || !userProfile) return;

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = uploadForm.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${userProfile.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bac-exams')
        .upload(filePath, uploadForm.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('bac-exams')
        .getPublicUrl(filePath);

      // Save PDF record
      const { error: dbError } = await supabase
        .from('student_pdfs')
        .insert({
          student_id: userProfile.id,
          title: uploadForm.title,
          description: uploadForm.description,
          file_url: publicUrl,
          file_name: uploadForm.file.name,
          file_size: uploadForm.file.size
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "PDF uploaded successfully!",
      });

      setUploadForm({ title: '', description: '', file: null });
      fetchPDFs();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deletePDF = async (pdfId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('bac-exams')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('student_pdfs')
        .delete()
        .eq('id', pdfId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "PDF deleted successfully!",
      });

      fetchPDFs();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Previous Student Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {userProfile?.full_name}</p>
          </div>
          <Button onClick={signOut} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload PDF Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass-effect border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New PDF
                </CardTitle>
                <CardDescription>
                  Share your study materials with current BAC students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Math Summary Chapter 1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of your study material..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="file">PDF File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={uploading} className="w-full ai-gradient text-white">
                    {uploading ? 'Uploading...' : 'Upload PDF'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Teaching Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass-effect border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Your Teaching Schedule
                </CardTitle>
                <CardDescription>
                  Upcoming mentoring sessions assigned by admin
                </CardDescription>
              </CardHeader>
              <CardContent>
                {schedules.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No teaching sessions scheduled yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="p-3 border rounded-lg bg-card/50">
                        <h4 className="font-semibold">{schedule.title}</h4>
                        <p className="text-sm text-muted-foreground">{schedule.description}</p>
                        <div className="text-sm mt-2">
                          <strong>Date:</strong> {new Date(schedule.scheduled_date).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          <strong>Time:</strong> {schedule.start_time} - {schedule.end_time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Uploaded PDFs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Uploaded PDFs ({pdfs.length})
              </CardTitle>
              <CardDescription>
                Manage your shared study materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pdfs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No PDFs uploaded yet. Start sharing your knowledge!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pdfs.map((pdf) => (
                    <div key={pdf.id} className="p-4 border rounded-lg bg-card/50 group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold truncate">{pdf.title}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const filePath = pdf.file_url.split('/').slice(-2).join('/');
                            deletePDF(pdf.id, filePath);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {pdf.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {new Date(pdf.created_at).toLocaleDateString()}
                        </span>
                        <Button size="sm" variant="outline" asChild>
                          <a href={pdf.file_url} target="_blank" rel="noopener noreferrer">
                            View PDF
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviousStudentDashboard;