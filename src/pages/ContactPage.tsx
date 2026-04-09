import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone, Send, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCourses } from '@/data/courses';

export default function ContactPage() {
  const mapUrl = "https://www.google.com/maps/place/Versatile+Prime+Infosoft+Pvt.+Ltd.+%7C+Best+MLM+Software+Development+Company+%7C+Best+App+Development+Company/@25.3336966,74.6396457,749m/data=!3m3!1e3!4b1!5s0x3968c3cd0da43e15:0xa7d96ec834304b52!4m6!3m5!1s0x3968c24a70258f47:0xf3c9c95241a75f1f!8m2!3d25.3336918!4d74.6422206!16s%2Fg%2F1q6jjlc1j?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-24 pb-16 min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card className="border-2 shadow-sm rounded-2xl">
              <CardContent className="p-10">
                <h2 className="text-3xl font-bold mb-8 font-heading">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Full Name</label>
                      <Input placeholder="John Doe" className="bg-secondary/30 border-border/50 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Email Address</label>
                      <Input type="email" placeholder="john@example.com" className="bg-secondary/30 border-border/50 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Phone Number</label>
                    <Input placeholder="+91 98765 43210" className="bg-secondary/30 border-border/50 h-12" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Your Message</label>
                    <Textarea 
                      placeholder="Tell us about your goals or any questions you have..." 
                      className="min-h-[150px] bg-secondary/30 border-border/50 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Course of Interest</label>
                    <Select>
                      <SelectTrigger className="bg-primary text-white border-primary h-12 rounded-xl focus:ring-primary/20 [&_svg]:text-white">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px] overflow-y-auto bg-primary text-white border-primary shadow-2xl rounded-xl">
                        {allCourses.map((course, index) => (
                          <SelectItem 
                            key={`${course.title}-${index}`} 
                            value={course.title}
                            className="text-white focus:bg-white/20 focus:text-white cursor-pointer py-3"
                          >
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 transition-all group rounded-xl">
                    Send Inquiry
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-2 shadow-sm rounded-2xl hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Our Location</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    Versatile Prime Infosoft Pvt. Ltd.<br />
                    Bhilwara, Rajasthan, India
                  </p>
                  <a 
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary font-bold mt-3 hover:underline group"
                  >
                    View on Google Maps
                    <ExternalLink className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-sm rounded-2xl hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Email Us</h3>
                  <p className="text-muted-foreground font-medium">info@edustream.com</p>
                  <p className="text-muted-foreground font-medium">admissions@edustream.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-sm rounded-2xl hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Call Us</h3>
                  <p className="text-muted-foreground font-medium">+91 98765 43210</p>
                  <p className="text-muted-foreground font-medium">+91 1482 123456</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
