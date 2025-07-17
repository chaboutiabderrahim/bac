
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Brain, Calendar } from "lucide-react";

const statsData = [
  {
    title: "Total Quizzes",
    value: "24",
    subtitle: "+3 this week",
    icon: Trophy,
    gradient: "from-primary to-primary/80",
    delay: 0.1
  },
  {
    title: "Average Score",
    value: "85%",
    subtitle: "+5% improvement",
    icon: TrendingUp,
    gradient: "from-success-color to-green-600",
    delay: 0.2
  },
  {
    title: "AI Sessions",
    value: "18",
    subtitle: "Learn with AI",
    icon: Brain,
    gradient: "from-accent to-purple-600",
    delay: 0.3
  },
  {
    title: "Study Streak",
    value: "15 days",
    subtitle: "Keep it up!",
    icon: Calendar,
    gradient: "from-warning-color to-orange-600",
    delay: 0.4
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
    rotateY: -15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateY: 0
  }
};

const valueVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1
  }
};

export const AnimatedStatsCards = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={cardVariants}
          transition={{
            type: "spring" as const,
            stiffness: 120,
            damping: 20,
            duration: 0.8
          }}
          whileHover={{ 
            y: -8, 
            scale: 1.05,
            transition: { type: "spring" as const, stiffness: 300, damping: 20 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={`bg-gradient-to-br ${stat.gradient} text-white border-0 overflow-hidden relative group cursor-pointer`}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: stat.delay + 0.2 }}
                >
                  {stat.title}
                </motion.span>
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: {
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: stat.delay + 1
                    }
                  }}
                >
                  <stat.icon className="h-4 w-4 opacity-80" />
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.div 
                className="text-3xl font-bold"
                variants={valueVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  type: "spring" as const,
                  stiffness: 200,
                  damping: 15,
                  delay: 0.5
                }}
              >
                {stat.value}
              </motion.div>
              <motion.p 
                className="text-white/80 text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay + 0.6 }}
              >
                {stat.subtitle}
              </motion.p>
            </CardContent>
            
            {/* Animated background elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: stat.delay
              }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/5 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.05, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: stat.delay + 1
              }}
            />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
