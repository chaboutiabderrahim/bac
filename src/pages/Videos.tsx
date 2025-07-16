
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ArrowLeft, Play, Lock, Star, Clock, Users } from "lucide-react";

// Videos Component - Displays organized video content by subject
// Manages free vs premium content access and video recommendations
const Videos = () => {
  // User subscription status - in real app this would come from authentication
  const [isPremium] = useState(false);

  // Video content organized by subjects - would come from database/API
  const videoContent = {
    mathematics: {
      name: "Mathematics",
      color: "blue",
      lessons: [
        {
          category: "Functions",
          videos: [
            { id: 1, title: "Introduction to Functions", duration: "15:30", level: "beginner", premium: false, views: 1250 },
            { id: 2, title: "Domain and Range", duration: "12:45", level: "intermediate", premium: true, views: 890 },
            { id: 3, title: "Composite Functions", duration: "18:20", level: "advanced", premium: true, views: 670 }
          ]
        },
        {
          category: "Limits",
          videos: [
            { id: 4, title: "Understanding Limits", duration: "20:15", level: "beginner", premium: false, views: 1450 },
            { id: 5, title: "Limit Laws and Properties", duration: "16:40", level: "intermediate", premium: true, views: 720 }
          ]
        },
        {
          category: "Derivatives",
          videos: [
            { id: 6, title: "Basic Differentiation", duration: "22:30", level: "intermediate", premium: false, views: 1120 },
            { id: 7, title: "Chain Rule Applications", duration: "19:50", level: "advanced", premium: true, views: 580 }
          ]
        }
      ]
    },
    physics: {
      name: "Physics",
      color: "green",
      lessons: [
        {
          category: "Mechanics",
          videos: [
            { id: 8, title: "Newton's Laws of Motion", duration: "25:10", level: "beginner", premium: false, views: 1680 },
            { id: 9, title: "Forces and Equilibrium", duration: "18:35", level: "intermediate", premium: true, views: 920 }
          ]
        },
        {
          category: "Dynamics",
          videos: [
            { id: 10, title: "Circular Motion", duration: "21:45", level: "intermediate", premium: true, views: 750 },
            { id: 11, title: "Energy and Work", duration: "17:20", level: "beginner", premium: false, views: 1340 }
          ]
        }
      ]
    },
    chemistry: {
      name: "Chemistry",
      color: "purple",
      lessons: [
        {
          category: "Atomic Structure",
          videos: [
            { id: 12, title: "Electron Configuration", duration: "14:25", level: "beginner", premium: false, views: 1050 },
            { id: 13, title: "Quantum Numbers", duration: "19:15", level: "advanced", premium: true, views: 480 }
          ]
        },
        {
          category: "Chemical Bonding",
          videos: [
            { id: 14, title: "Ionic and Covalent Bonds", duration: "16:50", level: "intermediate", premium: true, views: 830 }
          ]
        }
      ]
    }
  };

  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle video click - check premium access
  const handleVideoClick = (video: any) => {
    if (video.premium && !isPremium) {
      alert("This is a premium video. Please upgrade to access full content.");
      return;
    }
    // In real app, this would navigate to video player
    console.log(`Playing video: ${video.title}`);
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
              <h1 className="text-xl font-bold text-gray-900">Study Videos</h1>
            </div>
            {!isPremium && (
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Upgrade to Premium
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Educational Videos</h2>
          <p className="text-gray-600">
            Access structured lessons organized by subject and difficulty level
          </p>
          {!isPremium && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <Lock className="inline h-4 w-4 mr-1" />
                You're viewing as a free user. Upgrade to premium to access all videos and exclusive content.
              </p>
            </div>
          )}
        </div>

        {/* Subject Tabs */}
        <Tabs defaultValue="mathematics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mathematics" className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Mathematics
            </TabsTrigger>
            <TabsTrigger value="physics" className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Physics
            </TabsTrigger>
            <TabsTrigger value="chemistry" className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              Chemistry
            </TabsTrigger>
          </TabsList>

          {/* Mathematics Videos */}
          <TabsContent value="mathematics" className="space-y-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Mathematics</h3>
              <p className="text-gray-600">Master mathematical concepts with structured video lessons</p>
            </div>
            
            {videoContent.mathematics.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex}>
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  {lesson.category}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lesson.videos.map((video) => (
                    <Card 
                      key={video.id} 
                      className={`cursor-pointer transition-all hover:shadow-lg ${video.premium && !isPremium ? 'opacity-75' : ''}`}
                      onClick={() => handleVideoClick(video)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                          {video.premium && (
                            <Lock className="h-4 w-4 text-yellow-600 flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getLevelColor(video.level)}>
                            {video.level}
                          </Badge>
                          {video.premium && (
                            <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {video.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {video.views.toLocaleString()}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full flex items-center gap-2"
                          variant={video.premium && !isPremium ? "outline" : "default"}
                          disabled={video.premium && !isPremium}
                        >
                          <Play className="h-4 w-4" />
                          {video.premium && !isPremium ? "Premium Required" : "Watch Video"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Physics Videos */}
          <TabsContent value="physics" className="space-y-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-green-600 mb-2">Physics</h3>
              <p className="text-gray-600">Understand physical phenomena through visual explanations</p>
            </div>
            
            {videoContent.physics.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex}>
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  {lesson.category}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lesson.videos.map((video) => (
                    <Card 
                      key={video.id} 
                      className={`cursor-pointer transition-all hover:shadow-lg ${video.premium && !isPremium ? 'opacity-75' : ''}`}
                      onClick={() => handleVideoClick(video)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                          {video.premium && (
                            <Lock className="h-4 w-4 text-yellow-600 flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getLevelColor(video.level)}>
                            {video.level}
                          </Badge>
                          {video.premium && (
                            <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {video.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {video.views.toLocaleString()}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full flex items-center gap-2"
                          variant={video.premium && !isPremium ? "outline" : "default"}
                          disabled={video.premium && !isPremium}
                        >
                          <Play className="h-4 w-4" />
                          {video.premium && !isPremium ? "Premium Required" : "Watch Video"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Chemistry Videos */}
          <TabsContent value="chemistry" className="space-y-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">Chemistry</h3>
              <p className="text-gray-600">Explore chemical reactions and molecular structures</p>
            </div>
            
            {videoContent.chemistry.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex}>
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  {lesson.category}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lesson.videos.map((video) => (
                    <Card 
                      key={video.id} 
                      className={`cursor-pointer transition-all hover:shadow-lg ${video.premium && !isPremium ? 'opacity-75' : ''}`}
                      onClick={() => handleVideoClick(video)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                          {video.premium && (
                            <Lock className="h-4 w-4 text-yellow-600 flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getLevelColor(video.level)}>
                            {video.level}
                          </Badge>
                          {video.premium && (
                            <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {video.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {video.views.toLocaleString()}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full flex items-center gap-2"
                          variant={video.premium && !isPremium ? "outline" : "default"}
                          disabled={video.premium && !isPremium}
                        >
                          <Play className="h-4 w-4" />
                          {video.premium && !isPremium ? "Premium Required" : "Watch Video"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Recommended Videos Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Recommended for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mix of recommended videos from different subjects */}
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quadratic Equations</CardTitle>
                <Badge className="bg-blue-100 text-blue-800 w-fit">Mathematics</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    14:35
                  </span>
                  <span>★ 4.8</span>
                </div>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Thermodynamics</CardTitle>
                <Badge className="bg-green-100 text-green-800 w-fit">Physics</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    18:20
                  </span>
                  <span>★ 4.7</span>
                </div>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all opacity-75">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Organic Chemistry</CardTitle>
                  <Lock className="h-4 w-4 text-yellow-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-800 w-fit">Chemistry</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    22:10
                  </span>
                  <span>★ 4.9</span>
                </div>
                <Button variant="outline" className="w-full" disabled>
                  Premium Required
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Probability Theory</CardTitle>
                <Badge className="bg-blue-100 text-blue-800 w-fit">Mathematics</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    16:45
                  </span>
                  <span>★ 4.6</span>
                </div>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Videos;
