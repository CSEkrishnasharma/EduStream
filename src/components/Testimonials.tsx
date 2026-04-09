import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Full Stack Developer at TechCorp",
    content: "The curriculum was incredibly practical. I went from knowing basic HTML to building complex web applications in just 6 months. Best investment in my career!",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Data Analyst at FinEdge",
    content: "The mentors here are top-notch. They don't just teach theory; they show you how things work in the industry. The placement support was a game-changer.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "UI Designer at CreativeFlow",
    content: "I loved the hands-on approach. Working on real projects gave me the confidence to handle professional design tasks immediately after graduation.",
    avatar: "https://i.pravatar.cc/150?u=emily",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of successful graduates who have transformed their careers with EduStream.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 rounded-3xl border border-border relative"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? 'text-accent fill-current' : 'text-muted'}`}
                  />
                ))}
              </div>
              <p className="text-lg mb-8 italic text-muted-foreground leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={t.avatar} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
