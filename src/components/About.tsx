import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Rocket, ShieldCheck, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const aboutData = [
  {
    id: 'mission',
    title: "Mission",
    icon: <Target className="w-5 h-5" />,
    content: "To empower every learner with future-ready skills in AI, Machine Learning, and modern development technologies by delivering practical, industry-driven education that transforms curiosity into real-world impact. We aim to bridge the gap between academic learning and industry demands, enabling students to build, innovate, and lead in the digital era."
  },
  {
    id: 'vision',
    title: "Vision",
    icon: <Rocket className="w-5 h-5" />,
    content: "To become a global catalyst for tech innovation by nurturing a generation of skilled creators, problem-solvers, and leaders who shape the future through AI and cutting-edge development. We envision a world where every student has the confidence and capability to turn ideas into intelligent solutions."
  },
  {
    id: 'usp',
    title: "Unique Selling Proposition",
    icon: <ShieldCheck className="w-5 h-5" />,
    content: "We don't just teach we build creators. Our programs focus on hands-on, project-based learning, real-world problem solving, and industry mentorship, ensuring students don't just understand concepts but apply them like professionals. With a strong emphasis on AI-driven innovation, personalized guidance, and career readiness, we transform beginners into confident developers and future tech leaders."
  }
];

export default function About() {
  const [activeTab, setActiveTab] = React.useState('mission');

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-medium font-heading mb-4">
            Our <span className="font-bold text-primary">Core Foundation</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the principles that drive our commitment to excellence in technology education.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Vertical Tabs Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {aboutData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 text-left group",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-background hover:bg-background/80 text-muted-foreground border border-border"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    activeTab === item.id ? "bg-white/20" : "bg-primary/10 text-primary"
                  )}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-lg">{item.title}</span>
                </div>
                <ChevronRight className={cn(
                  "w-5 h-5 transition-transform",
                  activeTab === item.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-8 bg-background rounded-[2rem] border border-border p-8 md:p-12 shadow-sm min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {aboutData.find(i => i.id === activeTab)?.title}
                </div>
                <h3 className="text-3xl font-bold font-heading">
                  {activeTab === 'mission' && "Empowering Future-Ready Learners"}
                  {activeTab === 'vision' && "Shaping the Future of Tech"}
                  {activeTab === 'usp' && "Building Creators, Not Just Students"}
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {aboutData.find(i => i.id === activeTab)?.content}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
