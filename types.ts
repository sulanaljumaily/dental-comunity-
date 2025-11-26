
export enum UserRole {
  GUEST = 'GUEST',
  DENTIST_OWNER = 'DENTIST_OWNER',
  DENTIST_STAFF = 'DENTIST_STAFF',
  SUPPLIER = 'SUPPLIER',
  LAB = 'LAB',
  ADMIN = 'ADMIN'
}

export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DOCTORS_HUB = 'DOCTORS_HUB',
  CLINIC_MANAGER = 'CLINIC_MANAGER',
  PATIENT_PROFILE = 'PATIENT_PROFILE',
  STORE = 'STORE',
  COMMUNITY = 'COMMUNITY',
  JOBS = 'JOBS',
  LAB_HUB = 'LAB_HUB',
  SUPPLIER_HUB = 'SUPPLIER_HUB',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
  MEDICAL_SERVICES = 'MEDICAL_SERVICES'
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  lastVisit: string;
  nextAppointment?: string;
  phone: string;
  totalSpent: number;
  debt: number;
  condition: 'Stable' | 'Critical' | 'Treatment';
  avatar: string;
  medicalHistory?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Checkup' | 'Surgery' | 'Orthodontics' | 'Cleaning' | 'RootCanal';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  duration: number;
  notes?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Receptionist' | 'Admin';
  phone: string;
  salary: number;
  revenueGenerated?: number;
  avatar: string;
  status: 'Active' | 'OnLeave';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Consumable' | 'Instrument' | 'Equipment';
  quantity: number;
  minLevel: number;
  unit: string;
  expiryDate?: string;
  supplier: string;
}

export interface Job {
  id: string;
  title: string;
  clinicName: string;
  location: string;
  type: 'Full-time' | 'Part-time';
  salaryRange: string;
  postedAt: string;
  requirements: string[];
  logo?: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  experience: number;
  avatar: string;
  isAvailable: boolean;
  bio: string;
}

export interface Post {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  category: 'Clinical' | 'Advice' | 'News';
}

export interface LabRequest {
  id: string;
  patientName: string;
  labName: string;
  item: string;
  toothNumber?: number;
  shade?: string;
  status: 'Pending' | 'InWork' | 'Shipped' | 'Delivered';
  requestDate: string;
  dueDate: string;
  cost: number;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'Income' | 'Expense';
  date: string;
  category: 'Treatment' | 'Lab' | 'Salary' | 'Supplies' | 'Rent' | 'Other';
  method: 'Cash' | 'Card' | 'ZainCash';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  brand: string;
  rating: number;
  category: string;
}

export interface Asset extends InventoryItem {
    status: 'Good' | 'Maintenance' | 'Low Stock';
    purchaseDate: string;
}

// --- Doctors Hub Specific Types ---
export interface Clinic {
  id: string;
  name: string;
  location: string;
  patientsCount: number;
  todayAppointments: number;
  status: 'Open' | 'Closed';
  image: string;
}

export interface HubTask {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assignee?: string;
}

export interface HubMessage {
  id: string;
  sender: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
  role: string;
}

export interface HubNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'Alert' | 'Info' | 'Success' | 'Order';
  read: boolean;
}
