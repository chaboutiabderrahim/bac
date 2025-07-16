
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, ArrowLeft, Star, GraduationCap, Calendar, MapPin, Clock, Users, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// StudentShowcase Component - Displays successful BAC students and their stories
// Allows current students to learn from graduates and book mentoring sessions
const StudentShowcase = () => {
  // Mock student data - in real app this would come from database
  const successfulStudents = [
    {
      id: 1,
      name: "Sarah Benali",
      photo: "/api/placeholder/150/150",
      bacYear: "2023",
      bacScore: "18.45",
      currentUniversity: "École Polytechnique",
      field: "Engineering",
      subjects: ["Mathematics", "Physics"],
      studyTips: "I focused on understanding concepts rather than memorizing. Daily practice with past exams was crucial.",
      studyMethod: "Pomodoro technique with 25-minute focused sessions, followed by active recall practice.",
      weeklyHours: 35,
      resources: ["Khan Academy", "Past BAC papers", "Study groups"],
      availableForMentoring: true,
      sessionsThisMonth: 2,
      rating: 4.9,
      totalSessions: 24,
      testimonials: "Sarah helped me understand complex calculus problems. Highly recommended!",
      location: "Casablanca, Morocco"
    },
    {
      id: 2,
      name: "Omar Alami",
      photo: "/api/placeholder/150/150",
      bacYear: "2022",
      bacScore: "17.85",
      currentUniversity: "Université Mohammed V",
      field: "Medicine",
      subjects: ["Biology", "Chemistry", "Physics"],
      studyTips: "Create visual mind maps for complex topics. Biology requires lots of diagrams and flowcharts.",
      studyMethod: "Spaced repetition system with Anki flashcards and weekly review sessions.",
      weeklyHours: 40,
      resources: ["Medical textbooks", "YouTube channels", "Peer discussions"],
      availableForMentoring: true,
      sessionsThisMonth: 1,
      rating: 4.8,
      totalSessions: 18,
      testimonials: "Omar's biology explanations are excellent. Very patient and thorough.",
      location: "Rabat, Morocco"
    },
    {
      id: 3,
      name: "Fatima Zouaki",
      photo: "/api/placeholder/150/150",
      bacYear: "2023",
      bacScore: "19.12",
      currentUniversity: "INSEA",
      field: "Economics & Statistics",
      subjects: ["Mathematics", "Economics"],
      studyTips: "Mathematics is all about practice. Solve at least 5 problems daily from different topics.",
      studyMethod: "Morning study sessions for math, afternoon for theory subjects, evening for review.",
      weeklyHours: 38,
      resources: ["Exercise books", "Online courses", "Teacher consultations"],
      availableForMentoring: false,
      sessionsThisMonth: 0,
      rating: 4.7,
      totalSessions: 12,
      testimonials: "Fatima has great study organization skills. Learned so much from her methods.",
      location: "Rabat, Morocco"
    },
    {
      id: 4,
      name: "Youssef Tahiri",
      photo: "/api/placeholder/150/150",
      bacYear: "2021",
      bacScore: "16.95",
      currentUniversity: "EMI",
      field: "Computer Engineering",
      subjects: ["Mathematics", "Physics", "Computer Science"],
      studyTips: "Use technology to your advantage. Create digital notes and use simulation software for physics.",
      studyMethod: "Project-based learning combined with traditional studying. Building things while learning theory.",
      weeklyHours: 42,
      resources: ["Programming tools", "Simulation software", "Online forums"],
      availableForMentoring: true,
      sessionsThisMonth: 2,
      rating: 4.6,
      totalSessions: 31,
      testimonials: "Youssef showed me how to apply math concepts in programming. Very innovative approach.",
      location: "Rabat, Morocco"
    },
    {
      id: 5,
      name: "Aisha Benjelloun",
      photo: "/api/placeholder/150/150",
      bacYear: "2022",
      bacScore: "18.20",
      currentUniversity: "Université Al Akhawayn",
      field: "Business Administration",
      subjects: ["Mathematics", "Economics", "French"],
      studyTips: "Language skills are crucial. Read French literature and practice writing essays regularly.",
      studyMethod: "Balanced approach: 40% practice problems, 30% reading, 30% discussion and explanation to others.",
      weeklyHours: 32,
      resources: ["French novels", "Business magazines", "Study partnerships"],
      availableForMentoring: true,
      sessionsThisMonth: 1,
      rating: 4.8,
      totalSessions: 15,
      testimonials: "Aisha helped me improve my French writing skills significantly.",
      location: "Ifrane, Morocco"
    },
    {
      id: 6,
      name: "Mehdi Fassi",
      photo: "/api/placeholder/150/150",
      bacYear: "2023",
      bacScore: "17.65",
      currentUniversity: "UM6P",
      field: "Chemical Engineering",
      subjects: ["Chemistry", "Mathematics", "Physics"],
      studyTips: "Chemistry needs both theory and practice. Do lab experiments whenever possible and understand reactions.",
      studyMethod: "Concept mapping for chemistry, problem-solving sessions for math and physics.",
      weeklyHours: 36,
      resources: ["Lab equipment", "Chemistry simulation apps", "Research papers"],
      availableForMentoring: true,
      sessionsThisMonth: 2,
      rating: 4.7,
      totalSessions: 20,
      testimonials: "Mehdi makes chemistry easy to understand with real-world examples.",
      location: "Ben Guerir, Morocco"
    }
  ];

  // Filter and sort options
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("score");

  // Get unique subjects
  const allSubjects = [...new Set(successfulStudents.flatMap(s => s.subjects))];

  // Filter and sort students
  const filteredStudents = successfulStudents
    .filter(student => 
      filterSubject === "all" || student.subjects.includes(filterSubject)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return parseFloat(b.bacScore) - parseFloat(a.bacScore);
        case "rating":
          return b.rating - a.rating;
        case "sessions":
          return b.totalSessions - a.totalSessions;
        default:
          return 0;
      }
    });

  // Handle booking session
  const handleBookSession = (student: any) => {
    if (!student.availableForMentoring) {
      toast({
        title: "Not Available",
        description: `${student.name} is not currently available for mentoring sessions.`,
        variant: "destructive",
      });
      return;
    }

    if (student.sessionsThisMonth >= 2) {
      toast({
        title: "Fully Booked",
        description: `${student.name} has reached the maximum sessions for this month.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Session Request Sent",
      description: `Your mentoring session request with ${student.name} has been sent. You'll receive a confirmation soon.`,
    });
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
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Success Stories</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Learn from Top BAC Students</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with successful BAC graduates, learn their study methods, and book mentoring sessions 
            to accelerate your own academic journey.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {successfulStudents.length}
              </div>
              <p className="text-sm text-gray-600">Success Stories</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {Math.round(successfulStudents.reduce((acc, s) => acc + parseFloat(s.bacScore), 0) / successfulStudents.length * 100) / 100}
              </div>
              <p className="text-sm text-gray-600">Average BAC Score</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {successfulStudents.filter(s => s.availableForMentoring).length}
              </div>
              <p className="text-sm text-gray-600">Available Mentors</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {successfulStudents.reduce((acc, s) => acc + s.totalSessions, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter & Sort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Filter by Subject</label>
                <select 
                  value={filterSubject} 
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Subjects</option>
                  {allSubjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Sort by</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="score">BAC Score</option>
                  <option value="rating">Rating</option>
                  <option value="sessions">Total Sessions</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-xl transition-shadow overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={student.photo} alt={student.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {student.location}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge className="bg-green-100 text-green-800 text-sm font-semibold">
                    BAC {student.bacYear}: {student.bacScore}/20
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{student.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* University & Field */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Current Studies</h4>
                  <p className="text-sm text-gray-600">{student.field}</p>
                  <p className="text-sm text-blue-600 font-medium">{student.currentUniversity}</p>
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specialized Subjects</h4>
                  <div className="flex flex-wrap gap-1">
                    {student.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Study Stats */}
                <div className="grid grid-cols-2 gap-4 py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{student.weeklyHours}h</div>
                    <div className="text-xs text-gray-600">Weekly Study</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{student.totalSessions}</div>
                    <div className="text-xs text-gray-600">Total Sessions</div>
                  </div>
                </div>

                {/* Study Tips Preview */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Study Tip</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    "{student.studyTips}"
                  </p>
                </div>

                {/* Study Method */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Study Method</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {student.studyMethod}
                  </p>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Recommended Resources</h4>
                  <div className="flex flex-wrap gap-1">
                    {student.resources.slice(0, 2).map((resource, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                        {resource}
                      </Badge>
                    ))}
                    {student.resources.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{student.resources.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 italic">
                    "{student.testimonials}"
                  </p>
                </div>

                {/* Availability Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {student.availableForMentoring ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-medium">Available</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-600 font-medium">Busy</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {student.sessionsThisMonth}/2 sessions this month
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    View Profile
                  </Button>
                  <Button 
                    onClick={() => handleBookSession(student)}
                    disabled={!student.availableForMentoring || student.sessionsThisMonth >= 2}
                    size="sm" 
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Video className="h-3 w-3" />
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-800">How Mentoring Sessions Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">1. Book a Session</h4>
                <p className="text-sm text-blue-700">Choose a mentor and request a session based on your needs and their availability.</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-800 mb-2">2. Video Call</h4>
                <p className="text-sm text-purple-700">Join a 60-minute video call to discuss study methods, solve problems, or get advice.</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-2">3. Follow-up</h4>
                <p className="text-sm text-green-700">Receive study materials and personalized recommendations to continue your progress.</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-blue-700 font-medium">
                Maximum 2 sessions per month • Each session lasts 60 minutes • Free for all students
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentShowcase;
