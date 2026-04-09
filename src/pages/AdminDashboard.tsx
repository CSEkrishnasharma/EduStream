import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit, Save, X, GraduationCap, Clock, Users, Star, Mail, CheckCircle, Trash, Database } from 'lucide-react';
import { subscribeToCourses, addCourse, updateCourse, deleteCourse, subscribeToInquiries, updateInquiryStatus, deleteInquiry, seedCourses, Course, Inquiry } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration: '',
    students: '0',
    rating: 5,
    price: '₹0',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (isAdmin) {
      const unsubscribeCourses = subscribeToCourses(setCourses);
      const unsubscribeInquiries = subscribeToInquiries(setInquiries);
      return () => {
        unsubscribeCourses();
        unsubscribeInquiries();
      };
    }
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return <Navigate to="/" />;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCourse(formData);
    setIsAdding(false);
    setFormData({ title: '', category: '', duration: '', students: '0', rating: 5, price: '₹0', description: '', image: '' });
  };

  const handleSeed = async () => {
    if (window.confirm("This will add 6 sample courses to your database. Continue?")) {
      setIsSeeding(true);
      try {
        await seedCourses();
        alert("Sample data seeded successfully!");
      } catch (error) {
        console.error("Seeding failed:", error);
      } finally {
        setIsSeeding(false);
      }
    }
  };

  const handleUpdate = async (id: string) => {
    await updateCourse(id, formData);
    setEditingId(null);
  };

  const startEdit = (course: Course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      category: course.category,
      duration: course.duration,
      students: course.students,
      rating: course.rating,
      price: course.price,
      description: course.description,
      image: course.image || ''
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your course catalog and student inquiries</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSeed} 
            disabled={isSeeding}
            className="gap-2"
          >
            <Database className="w-4 h-4" />
            {isSeeding ? 'Seeding...' : 'Seed Sample Data'}
          </Button>
        </div>

        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="bg-background border border-border p-1 rounded-xl">
            <TabsTrigger value="courses" className="rounded-lg px-6">Courses</TabsTrigger>
            <TabsTrigger value="inquiries" className="rounded-lg px-6">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="flex justify-end mb-6">
              <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
                {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isAdding ? 'Cancel' : 'Add New Course'}
              </Button>
            </div>

            {isAdding && (
              <Card className="mb-12 border-primary/20 shadow-xl">
                <CardHeader>
                  <CardTitle>Create New Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Course Title</label>
                        <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Advanced React" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Development" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Duration</label>
                          <Input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 8 Weeks" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Price</label>
                          <Input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. ₹4,999" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Course details..." className="min-h-[100px]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Image URL (Optional)</label>
                        <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
                      </div>
                      <Button type="submit" className="w-full h-12 mt-4">Create Course</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6">
              {courses.map(course => (
                <Card key={course.id} className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 md:h-auto bg-muted relative">
                      {course.image ? (
                        <img src={course.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <GraduationCap className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow p-6">
                      {editingId === course.id ? (
                        <div className="space-y-4">
                          <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                          <div className="grid grid-cols-2 gap-4">
                            <Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                            <Input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                          </div>
                          <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleUpdate(course.id)} className="gap-1">
                              <Save className="w-4 h-4" /> Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">{course.category}</span>
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost" onClick={() => startEdit(course)} className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" onClick={() => deleteCourse(course.id)} className="h-8 w-8 text-destructive hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</div>
                            <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students}</div>
                            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-accent fill-current" /> {course.rating}</div>
                            <div className="font-bold text-primary">{course.price}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="grid gap-6">
              {inquiries.length === 0 ? (
                <div className="text-center py-20 bg-background rounded-2xl border border-dashed border-border">
                  <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">No inquiries yet.</p>
                </div>
              ) : (
                inquiries.map(inquiry => (
                  <Card key={inquiry.id} className={`border-border transition-colors ${inquiry.status === 'new' ? 'border-l-4 border-l-primary' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold">{inquiry.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {inquiry.status === 'new' && (
                            <Button size="sm" variant="outline" onClick={() => updateInquiryStatus(inquiry.id, 'read')} className="gap-1">
                              <CheckCircle className="w-4 h-4" /> Mark as Read
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" onClick={() => deleteInquiry(inquiry.id)} className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-secondary/30 p-4 rounded-xl mb-4">
                        {inquiry.courseName && (
                          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                            Interested in: {inquiry.courseName}
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{inquiry.message}</p>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Submitted on: {inquiry.createdAt?.toDate().toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded-full uppercase font-bold ${
                          inquiry.status === 'new' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
