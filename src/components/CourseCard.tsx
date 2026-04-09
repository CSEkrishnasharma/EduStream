import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Course {
  title: string;
  category: string;
  duration: string;
  students: string;
  rating: number;
  image?: string;
  price: string;
  description: string;
}

import { Link } from 'react-router-dom';

export default function CourseCard({ course, compact = false }: { course: Course; compact?: boolean }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 group border-border">
      {!compact && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.image || `https://picsum.photos/seed/${course.title}/800/600`}
            alt={course.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-sm border-none">
            {course.category}
          </Badge>
        </div>
      )}
      <CardHeader className={cn("p-5 pb-2", compact && "pt-5")}>
        {compact && (
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
              {course.category}
            </Badge>
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold">{course.rating}</span>
            </div>
          </div>
        )}
        {!compact && (
          <div className="flex items-center gap-1 text-accent mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{course.rating}</span>
          </div>
        )}
        <h3 className={cn("font-bold leading-tight group-hover:text-primary transition-colors", compact ? "text-lg" : "text-xl")}>
          {course.title}
        </h3>
      </CardHeader>
      <CardContent className="p-5 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.students}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex flex-col gap-3 border-top border-border mt-auto">
        <div className="flex items-center justify-between w-full pt-4">
          <span className="text-xl font-bold text-primary">{course.price}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button size="sm" className="w-full font-semibold">Enroll Now</Button>
          <Link to={`/?course=${encodeURIComponent(course.title)}#contact`} className="w-full">
            <Button size="sm" variant="outline" className="w-full border-2 font-semibold">Inquiry</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
