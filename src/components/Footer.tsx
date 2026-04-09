import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const mapUrl = "https://www.google.com/maps/place/Versatile+Prime+Infosoft+Pvt.+Ltd.+%7C+Best+MLM+Software+Development+Company+%7C+Best+App+Development+Company/@25.3336966,74.6396457,749m/data=!3m3!1e3!4b1!5s0x3968c3cd0da43e15:0xa7d96ec834304b52!4m6!3m5!1s0x3968c24a70258f47:0xf3c9c95241a75f1f!8m2!3d25.3336918!4d74.6422206!16s%2Fg%2F1q6jjlc1j?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <footer className="bg-background border-top border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-heading">EduStream</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Empowering the next generation of professionals through expert-led training and real-world projects.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="/#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Popular Courses</h4>
            <ul className="space-y-4">
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Data Science</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">UI/UX Design</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Digital Marketing</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Cloud Computing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Versatile Prime Infosoft, Bhilwara, Rajasthan</span>
                  <a 
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xs font-semibold mt-1 flex items-center gap-1 hover:underline"
                  >
                    View on Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">info@edustream.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-top border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 EduStream Training Institute. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
