import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const trainers = [
  {
    name: "Dr. Rajesh Kumar",
    expertise: "AI & Machine Learning",
    experience: "15+ Years",
    image: "https://picsum.photos/seed/rajesh/400/500",
  },
  {
    name: "Priya Sharma",
    expertise: "Full Stack Development",
    experience: "8+ Years",
    image: "https://picsum.photos/seed/priya/400/500",
  },
  {
    name: "Amit Patel",
    expertise: "Cloud Computing (AWS)",
    experience: "10+ Years",
    image: "https://picsum.photos/seed/amit/400/500",
  },
  {
    name: "Sneha Gupta",
    expertise: "UI/UX Design",
    experience: "7+ Years",
    image: "https://picsum.photos/seed/sneha/400/500",
  },
  {
    name: "Vikram Singh",
    expertise: "Data Science & Python",
    experience: "12+ Years",
    image: "https://picsum.photos/seed/vikram/400/500",
  },
  {
    name: "Anjali Verma",
    expertise: "Java & Enterprise Apps",
    experience: "9+ Years",
    image: "https://picsum.photos/seed/anjali/400/500",
  },
  {
    name: "Rahul Mehta",
    expertise: "DevOps & Docker",
    experience: "11+ Years",
    image: "https://picsum.photos/seed/rahul/400/500",
  },
  {
    name: "Kavita Reddy",
    expertise: "Digital Marketing",
    experience: "6+ Years",
    image: "https://picsum.photos/seed/kavita/400/500",
  },
  {
    name: "Sanjay Das",
    expertise: "Cybersecurity",
    experience: "13+ Years",
    image: "https://picsum.photos/seed/sanjay/400/500",
  },
  {
    name: "Meera Iyer",
    expertise: "Mobile App Development",
    experience: "8+ Years",
    image: "https://picsum.photos/seed/meera/400/500",
  }
];

// Duplicate the list for a seamless marquee effect
const marqueeTrainers = [...trainers, ...trainers];

export default function Trainers() {
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <section id="trainers" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold font-heading mb-4">
            Meet Our <span className="text-primary">Expert Trainers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Learn from industry veterans with years of real-world experience in cutting-edge technologies.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-12">
        <div
          className={cn(
            "flex gap-8 px-4 animate-marquee",
            isPaused && "pause-animation"
          )}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {marqueeTrainers.map((trainer, index) => (
            <motion.div
              key={`${trainer.name}-${index}`}
              whileHover={{ scale: 1.08, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-72"
            >
              <Card className="h-full overflow-hidden border-2 border-border shadow-md hover:shadow-2xl transition-all duration-300 bg-card">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="object-cover w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                    <Badge className="bg-primary text-white border-none text-[10px] uppercase tracking-wider">
                      Expert Mentor
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Expertise</p>
                      <p className="font-semibold text-sm leading-tight">{trainer.expertise}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2 rounded-lg shrink-0">
                      <Briefcase className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Experience</p>
                      <p className="font-semibold text-sm">{trainer.experience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
