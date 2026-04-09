import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '@/components/CourseCard';
import { subscribeToCourses, Course } from '@/lib/firebase';
import { SAMPLE_COURSES } from '@/constants';

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCourses((allCourses) => {
      if (allCourses.length === 0) {
        setCourses(SAMPLE_COURSES as any);
      } else {
        setCourses(allCourses.slice(0, 6));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="courses" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Explore Our <span className="text-primary">Training Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose from our curated selection of industry-driven courses designed to transform you into a tech leader.
            </p>
          </div>
          
          <Link to="/courses">
            <Button variant="outline" className="gap-2 h-12 px-6">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
