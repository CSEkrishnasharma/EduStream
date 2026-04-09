import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_COURSES } from '@/constants';
import { motion } from 'motion/react';
import { Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useSearchParams, useLocation } from 'react-router-dom';
import React from 'react';
import { submitInquiry } from '@/lib/firebase';

export default function InquiryForm() {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const [courseName, setCourseName] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    const course = searchParams.get('course');
    if (course) {
      setCourseName(course);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (hash === '#contact') {
      const element = document.getElementById('contact');
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitInquiry({
        fullName,
        email,
        courseName,
        message
      });
      setIsSuccess(true);
      setFullName('');
      setEmail('');
      setMessage('');
      setCourseName('');
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[2.5rem] overflow-hidden relative">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
            <div className="text-primary-foreground">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">
                <MessageSquare className="w-3 h-3" />
                Get in Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                Have Questions? <br />
                <span className="text-accent">Let's Talk.</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-md">
                Our expert counselors are here to help you choose the right path for your career. Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <span>Direct response from our mentors</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-background p-8 md:p-10 rounded-3xl shadow-2xl"
            >
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8">Thank you for your inquiry. Our team will contact you shortly.</p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full">Send Another Message</Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input 
                        required 
                        placeholder="John Doe" 
                        className="bg-secondary/50 border-none h-12" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input 
                        required 
                        type="email" 
                        placeholder="john@example.com" 
                        className="bg-secondary/50 border-none h-12" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interested Course</label>
                    <Select value={courseName || ""} onValueChange={setCourseName}>
                      <SelectTrigger className="w-full h-12 bg-secondary/50 border-none">
                        <SelectValue placeholder="Select a course..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SAMPLE_COURSES.map(course => (
                          <SelectItem key={course.id} value={course.title}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Message</label>
                    <Textarea 
                      required
                      placeholder="Tell us about your goals..." 
                      className="bg-secondary/50 border-none min-h-[120px] resize-none" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-bold gap-2 mt-4 shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
