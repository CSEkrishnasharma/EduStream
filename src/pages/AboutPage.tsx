import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              About <span className="text-primary">EduStream</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are dedicated to providing high-quality, industry-relevant training to help you achieve your career goals.
            </p>
          </motion.div>
          
          <About />
          
          <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Founded with a vision to democratize high-end tech education, EduStream has grown from a small training center to a leading institute for professional development.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that practical experience is the key to mastery. That's why all our courses are built around real-world projects and industry standards.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/education/800/600" 
                alt="Our Campus" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
