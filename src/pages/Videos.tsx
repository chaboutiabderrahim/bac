import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Video, Clock, Users, User, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import EmptyState from "@/components/EmptyState";

interface Subject {
  id: number;
  subject_en: string;
  subject_ar: string;
}

interface VideoData {
  id: string;
  title: string;
  description?: string;
  url: string;
  duration?: number;
  view_count: number;
  subject_id: number;
  created_at: string;
  subject?: Subject;
}

const Videos = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch subjects and videos in parallel
        const [subjectsResponse, videosResponse] = await Promise.all([
          supabase.from('bac_subjects').select('*'),
          supabase.from('videos').select(`
            *,
            bac_subjects:subject_id (
              id,
              subject_en,
              subject_ar
            )
          `)
        ]);

        if (subjectsResponse.error) throw subjectsResponse.error;
        if (videosResponse.error) throw videosResponse.error;

        setSubjects(subjectsResponse.data || []);
        setVideos(videosResponse.data || []);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
        toast({
          title: "Error loading data",
          description: err.message || "Failed to load videos and subjects",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);

  // Filter videos by selected subject
  const filteredVideos = selectedSubject 
    ? videos.filter(video => video.subject_id.toString() === selectedSubject)
    : videos;

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const handleClearFilters = () => {
    setSelectedSubject("");
  };

  const handleVideoAction = (video: VideoData, action: string) => {
    // Sanitize video data before logging
    const sanitizedVideo = {
      id: video.id,
      title: video.title?.replace(/<[^>]*>/g, '') || 'Untitled',
      subject: video.subject?.subject_en || 'Unknown Subject'
    };
    
    console.log(`Video ${action}:`, sanitizedVideo);
    
    switch (action) {
      case 'play':
        // Future: Implement video player
        toast({
          title: "Video Player",
          description: `Playing: ${sanitizedVideo.title}`,
        });
        break;
      case 'download':
        // Future: Implement download
        toast({
          title: "Download",
          description: "Download feature coming soon!",
        });
        break;
      default:
        break;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          {/* Header Skeleton */}
          <header className="bg-card shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
              </div>
              
              <div className="flex gap-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-32" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <EmptyState 
            title="Error Loading Videos"
            description={error}
            action={{
              label: "Try Again",
              onClick: () => window.location.reload()
            }}
          />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Video className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Study Videos</h1>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Educational Videos</h2>
            <p className="text-muted-foreground">
              Browse and watch educational videos by subject
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedSubject} onValueChange={handleSubjectChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.subject_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedSubject && (
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          {/* Videos Grid */}
          {filteredVideos.length === 0 ? (
            selectedSubject ? (
              <EmptyState 
                title="No Videos Found"
                description="No videos found for the selected subject. Try selecting a different subject or clearing filters."
                action={{
                  label: "Clear Filters",
                  onClick: handleClearFilters
                }}
              />
            ) : (
              <EmptyState 
                title="Start Browsing Videos"
                description="Select a subject above to view available educational videos, or browse all videos below."
              />
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight line-clamp-2">
                        {video.title}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">
                        {video.subject?.subject_en || 'Unknown Subject'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {video.description && (
                      <CardDescription className="mb-3 line-clamp-2">
                        {video.description}
                      </CardDescription>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(video.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{video.view_count.toLocaleString()} views</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handleVideoAction(video, 'play')}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* How to Use Section */}
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">How to Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Browse Videos</h4>
                <p>Use the subject filter to find videos for specific topics, or browse all available videos.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Watch & Learn</h4>
                <p>Click "Watch Video" to start learning. Videos are organized by subject and difficulty level.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Videos;