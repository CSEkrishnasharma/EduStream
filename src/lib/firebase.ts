// src/lib/firebase.ts
import { SAMPLE_COURSES } from '../constants';

export type UserRole = 'student' | 'admin';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: any;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  students: string;
  rating: number;
  image?: string;
  price: string;
  description: string;
  createdAt: any;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  courseName?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: any;
}

const getStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('mock_db_update'));
}

const ADMIN_EMAILS = [
  "krishnasharma76542@gmail.com",
  "info@versatileitsolution.com",
  "hr@versatileitsolution.com"
];

const seedAdmins = () => {
  let users = getStorage('mockUsers');
  let updated = false;
  ADMIN_EMAILS.forEach((email, index) => {
    if (!users.find((u: any) => u.email === email)) {
      users.push({
        uid: 'admin_seeded_' + index,
        email,
        displayName: 'Admin User',
        photoURL: null,
        role: 'admin',
        createdAt: new Date().toISOString(),
        _password: '123456789'
      });
      updated = true;
    }
  });
  if (updated) setStorage('mockUsers', users);
};
seedAdmins();

// Auth state
let currentUser: FirebaseUser | null = null;
let authListeners: ((user: FirebaseUser | null) => void)[] = [];

export const subscribeToAuth = (callback: (user: FirebaseUser | null) => void) => {
  const storedUser = localStorage.getItem('mockUser');
  if (!currentUser && storedUser) {
    currentUser = JSON.parse(storedUser);
  }
  callback(currentUser);
  authListeners.push(callback);
  return () => { authListeners = authListeners.filter(cb => cb !== callback); };
}

export const subscribeToProfile = (uid: string, callback: (profile: UserProfile | null) => void) => {
  const checkProfile = () => {
    const users = getStorage('mockUsers');
    const profile = users.find((u: any) => u.uid === uid) || null;
    callback(profile);
  };
  checkProfile();
  
  const listener = () => checkProfile();
  window.addEventListener('mock_db_update', listener);
  return () => window.removeEventListener('mock_db_update', listener);
}

export const loginWithGoogle = async () => {
  const email = "googleuser@example.com";
  const fakeUser = { uid: 'google_123', email, displayName: 'Google User', photoURL: null };
  await handleMockLogin(fakeUser);
}

export const loginWithEmail = async (email: string, password: string) => {
  const cleanEmail = email.trim().toLowerCase();
  if (password.length < 6) throw new Error("Incorrect password.");
  
  let users = getStorage('mockUsers');
  let existing = users.find((u: any) => (u.email || "").trim().toLowerCase() === cleanEmail);

  if (!existing && ADMIN_EMAILS.includes(cleanEmail)) {
    existing = {
      uid: 'admin_failsafe_' + Date.now(),
      email: cleanEmail,
      displayName: 'Admin User',
      photoURL: null,
      role: 'admin',
      createdAt: new Date().toISOString(),
      _password: '123456789'
    };
    users.push(existing);
    setStorage('mockUsers', users);
  }

  if (!existing) throw new Error("No account found with this email. Please sign up first.");
  
  if (existing._password && existing._password !== password) {
    throw new Error("Incorrect password.");
  }
  
  const fakeUser = { uid: existing.uid, email: existing.email, displayName: existing.displayName, photoURL: existing.photoURL };
  await handleMockLogin(fakeUser);
}

export const signupWithEmail = async (email: string, password: string, name?: string) => {
  const cleanEmail = email.trim().toLowerCase();
  const users = getStorage('mockUsers');
  if (users.find((u: any) => (u.email || "").trim().toLowerCase() === cleanEmail)) throw new Error("An account already exists with this email.");
  
  const uid = 'user_' + Date.now();
  const fakeUser = { uid, email: cleanEmail, displayName: name || cleanEmail, photoURL: null };

  const profile: any = { 
    ...fakeUser, 
    role: ADMIN_EMAILS.includes(cleanEmail) ? 'admin' : 'student', 
    createdAt: new Date().toISOString(),
    _password: password
  };
  users.push(profile);
  setStorage('mockUsers', users);
  
  await handleMockLogin(fakeUser);
}

const handleMockLogin = async (user: FirebaseUser) => {
  currentUser = user;
  localStorage.setItem('mockUser', JSON.stringify(user));
  
  const users = getStorage('mockUsers');
  let profile = users.find((u: any) => u.uid === user.uid);
  if (!profile) {
     profile = { ...user, role: ADMIN_EMAILS.includes(user.email || "") ? 'admin' : 'student', createdAt: new Date().toISOString() };
     users.push(profile);
     setStorage('mockUsers', users);
  }
  
  authListeners.forEach(cb => cb(currentUser));
}

export const logout = async () => {
  currentUser = null;
  localStorage.removeItem('mockUser');
  authListeners.forEach(cb => cb(null));
}

// Courses
export const subscribeToCourses = (callback: (courses: Course[]) => void) => {
  const check = () => {
    const data = getStorage('mockCourses').map((c: any) => ({
      ...c,
      createdAt: { toDate: () => new Date(c.createdAt) }
    }));
    callback(data);
  };
  check();
  const listener = () => check();
  window.addEventListener('mock_db_update', listener);
  return () => window.removeEventListener('mock_db_update', listener);
}

export const addCourse = async (course: any) => {
  const courses = getStorage('mockCourses');
  courses.unshift({ ...course, id: 'course_' + Date.now(), createdAt: new Date().toISOString() });
  setStorage('mockCourses', courses);
}

export const updateCourse = async (id: string, updates: any) => {
  const courses = getStorage('mockCourses').map((c: any) => c.id === id ? { ...c, ...updates } : c);
  setStorage('mockCourses', courses);
}

export const deleteCourse = async (id: string) => {
  const courses = getStorage('mockCourses').filter((c: any) => c.id !== id);
  setStorage('mockCourses', courses);
}

export const seedCourses = async () => {
  let courses = getStorage('mockCourses');
  if (courses.length === 0) {
    setStorage('mockCourses', SAMPLE_COURSES.map(c => ({...c, id: Date.now().toString() + Math.random(), createdAt: new Date().toISOString() })));
  }
}

// Inquiries
export const subscribeToInquiries = (callback: (i: Inquiry[]) => void) => {
  const check = () => {
    const data = getStorage('mockInquiries').map((i: any) => ({
      ...i,
      createdAt: { toDate: () => new Date(i.createdAt) }
    }));
    callback(data);
  };
  check();
  const listener = () => check();
  window.addEventListener('mock_db_update', listener);
  return () => window.removeEventListener('mock_db_update', listener);
}

export const submitInquiry = async (inq: any) => {
  const res = getStorage('mockInquiries');
  res.unshift({ ...inq, id: 'inq_' + Date.now(), status: 'new', createdAt: new Date().toISOString() });
  setStorage('mockInquiries', res);
}

export const updateInquiryStatus = async (id: string, status: string) => {
  const res = getStorage('mockInquiries').map((i: any) => i.id === id ? { ...i, status } : i);
  setStorage('mockInquiries', res);
}

export const deleteInquiry = async (id: string) => {
  const res = getStorage('mockInquiries').filter((i: any) => i.id !== id);
  setStorage('mockInquiries', res);
}
