
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  BookOpen, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Target, 
  TrendingUp,
  Calculator,
  Atom,
  Globe,
  FileText,
  Languages,
  ArrowLeft,
  Bot,
  User,
  Lightbulb
} from "lucide-react";

const LearnWithAI = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [chatInput, setChatInput] = useState("");

  const subjects = [
    { 
      id: 'math', 
      name: 'Mathematics', 
      icon: Calculator, 
      color: 'bg-blue-500',
      topics: ['Functions', 'Limits', 'Derivatives', 'Integrals', 'Statistics', 'Geometry']
    },
    { 
      id: 'physics', 
      name: 'Physics', 
      icon: Atom, 
      color: 'bg-purple-500',
      topics: ['Mechanics', 'Thermodynamics', 'Waves', 'Electricity', 'Optics', 'Modern Physics']
    },
    { 
      id: 'chemistry', 
      name: 'Chemistry', 
      icon: Atom, 
      color: 'bg-green-500',
      topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry']
    },
    { 
      id: 'french', 
      name: 'French', 
      icon: Languages, 
      color: 'bg-red-500',
      topics: ['Grammar', 'Literature', 'Essay Writing', 'Poetry Analysis', 'Vocabulary']
    },
    { 
      id: 'arabic', 
      name: 'Arabic', 
      icon: Languages, 
      color: 'bg-orange-500',
      topics: ['Grammar', 'Literature', 'Poetry', 'Rhetoric', 'Classical Texts']
    },
    { 
      id: 'philosophy', 
      name: 'Philosophy', 
      icon: Brain, 
      color: 'bg-indigo-500',
      topics: ['Ethics', 'Logic', 'Metaphysics', 'Political Philosophy', 'Epistemology']
    }
  ];

  const generateSummary = async (subject: string, topic: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockSummaries = {
        'math-functions': `**Functions in Mathematics**

Based on analysis of successful BAC students and past exams, here's your personalized summary:

**Key Concepts:**
• Definition: A function is a relation where each input has exactly one output
• Domain and Range: Understanding the set of possible inputs and outputs
• Types: Linear, Quadratic, Exponential, Logarithmic, Trigonometric

**Success Strategy from Top Students:**
Most successful students emphasize practicing function composition and inverse functions. They recommend starting with simple linear functions and gradually building complexity.

**Common Exam Patterns:**
- 40% of questions focus on finding domain and range
- 30% involve function composition
- 20% require graphing and transformations
- 10% cover inverse functions

**Practice Recommendations:**
1. Master basic function notation f(x)
2. Practice domain/range identification
3. Work on function composition f(g(x))
4. Learn graphing techniques and transformations`,

        'physics-mechanics': `**Mechanics in Physics**

AI Analysis based on successful students and exam patterns:

**Core Principles:**
• Newton's Laws of Motion - Foundation of all mechanics
• Kinematics: Motion description without considering forces
• Dynamics: Motion analysis with forces
• Energy Conservation: Kinetic and Potential Energy

**Top Student Insights:**
High achievers recommend drawing free-body diagrams for every problem and always identifying the system of interest first.

**Exam Statistics:**
- 35% projectile motion problems
- 25% circular motion and centripetal force
- 20% energy conservation
- 20% collision and momentum

**Study Method:**
1. Start with conceptual understanding
2. Practice problem-solving systematically
3. Focus on real-world applications
4. Master vector analysis techniques`,

        'default': `**AI-Generated Study Summary**

This topic is crucial for BAC success. Based on our analysis:

**Key Learning Points:**
• Fundamental concepts and definitions
• Common problem-solving approaches
• Practical applications and examples

**Success Patterns:**
Top students consistently review basics before advancing to complex topics.

**Recommended Study Approach:**
1. Build strong foundational knowledge
2. Practice regularly with varied problems
3. Seek clarification on difficult concepts
4. Review past exam questions`
      };

      const summaryKey = `${subject}-${topic.toLowerCase().replace(' ', '')}`;
      const summary = mockSummaries[summaryKey] || mockSummaries['default'];
      
      setGeneratedSummary(summary);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSubjectSelect = (subject: any) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setGeneratedSummary(null);
    setChatMessages([]);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    generateSummary(selectedSubject.id, topic);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: chatInput }
    ];
    
    setChatMessages(newMessages);
    setChatInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I'd be happy to explain that concept further! Let me break it down step by step...",
        "That's a great question! Here's another way to think about it...",
        "Based on successful student strategies, I recommend focusing on...",
        "Let me provide a practical example to illustrate this concept...",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      setChatMessages([
        ...newMessages,
        { role: 'ai' as const, content: randomResponse }
      ]);
    }, 1000);
  };

  const resetToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setGeneratedSummary(null);
    setChatMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <header className="glass-effect border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="ai-gradient p-2 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Learn with AI
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedSubject ? (
          // Subject Selection
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Choose Your Subject</h2>
              <p className="text-muted-foreground text-lg">Select a subject to start your AI-powered learning session</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card 
                  key={subject.id} 
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-2"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-3 ${subject.color} rounded-lg`}>
                        <subject.icon className="h-6 w-6 text-white" />
                      </div>
                      <span>{subject.name}</span>
                    </CardTitle>
                    <CardDescription>
                      AI-powered learning for {subject.name.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {subject.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{subject.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : !selectedTopic ? (
          // Topic Selection
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={resetToSubjects}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Subjects
              </Button>
              <div className="flex items-center gap-3">
                <div className={`p-2 ${selectedSubject.color} rounded-lg`}>
                  <selectedSubject.icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Select a Topic
                </CardTitle>
                <CardDescription>
                  Choose a specific topic to generate an AI-powered summary and learning plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSubject.topics.map((topic) => (
                    <Button
                      key={topic}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start hover:bg-primary hover:text-white transition-all"
                      onClick={() => handleTopicSelect(topic)}
                    >
                      <div>
                        <div className="font-medium">{topic}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          AI-powered summary
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // AI Learning Interface
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setSelectedTopic(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Topics
              </Button>
              <div className="flex items-center gap-3">
                <div className={`p-2 ${selectedSubject.color} rounded-lg`}>
                  <selectedSubject.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedSubject.name}</h2>
                  <p className="text-muted-foreground">{selectedTopic}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Summary */}
              <div className="lg:col-span-2">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      AI-Generated Summary
                    </CardTitle>
                    <CardDescription>
                      Based on successful student data and past exam analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isGenerating ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                          <p className="text-muted-foreground">Generating AI summary...</p>
                        </div>
                      </div>
                    ) : generatedSummary ? (
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-line text-sm leading-relaxed">
                          {generatedSummary}
                        </div>
                        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-accent" />
                            <span className="font-medium text-accent">AI Recommendation</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Start with the fundamentals and practice regularly. Use the chat below for specific questions!
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </div>

              {/* AI Chat */}
              <div className="lg:col-span-1">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Chat with AI
                    </CardTitle>
                    <CardDescription>
                      Ask questions for deeper understanding
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/20 rounded-lg">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-muted-foreground text-sm py-8">
                          <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          Ask me anything about {selectedTopic}!
                        </div>
                      ) : (
                        chatMessages.map((message, index) => (
                          <div key={index} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div className={`p-1 rounded-full ${message.role === 'user' ? 'bg-primary' : 'bg-muted'}`}>
                                {message.role === 'user' ? 
                                  <User className="h-3 w-3 text-white" /> : 
                                  <Bot className="h-3 w-3 text-muted-foreground" />
                                }
                              </div>
                              <div className={`p-2 rounded-lg text-xs ${
                                message.role === 'user' 
                                  ? 'bg-primary text-white' 
                                  : 'bg-white border'
                              }`}>
                                {message.content}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about this topic..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                        className="text-sm"
                      />
                      <Button size="sm" onClick={sendChatMessage} disabled={!chatInput.trim()}>
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LearnWithAI;
