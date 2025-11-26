import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Calendar, Users, TestTube, Stethoscope, 
  UserCog, Box, DollarSign, FileBarChart, Plus, Bell, Search, MapPin, 
  Settings, FileText, History, ChevronRight, Clock, CheckCircle, Filter, Star, 
  AlertTriangle, Truck, TrendingUp, PieChart as PieIcon, ArrowUpRight, ArrowDownRight,
  CreditCard, Brain, Image as ImageIcon, Download, Share2, Printer, File, Activity,
  Monitor, Zap, Home, PenTool, MoreHorizontal, Phone, Mail, ChevronDown, ClipboardList
} from 'lucide-react';
import { AppView, Patient, Appointment, LabRequest, Staff, InventoryItem, Transaction, Asset, HubTask } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';
import DentalChart from '../components/DentalChart';

interface Props {
  onNavigate: (view: AppView) => void;
}

// --- Mock Data ---
const revenueData = [
  { day: 'Sat', income: 450000, expense: 120000 },
  { day: 'Sun', income: 720000, expense: 300000 },
  { day: 'Mon', income: 580000, expense: 150000 },
  { day: 'Tue', income: 900000, expense: 200000 },
  { day: 'Wed', income: 650000, expense: 100000 },
  { day: 'Thu', income: 800000, expense: 400000 },
];

const mockPatients: Patient[] = [
  { id: '1', name: 'أحمد محمد', age: 28, gender: 'Male', lastVisit: '2023-10-15', phone: '0770000000', totalSpent: 250000, debt: 0, condition: 'Treatment', avatar: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'سارة علي', age: 34, gender: 'Female', lastVisit: '2023-10-20', phone: '0780000000', totalSpent: 150000, debt: 50000, condition: 'Stable', avatar: 'https://picsum.photos/100/100?random=2' },
  { id: '3', name: 'حسين كاظم', age: 45, gender: 'Male', lastVisit: '2023-10-22', phone: '0750000000', totalSpent: 800000, debt: 0, condition: 'Critical', avatar: 'https://picsum.photos/100/100?random=3' },
];

const mockAppointments: Appointment[] = [
  { id: '1', patientId: '1', patientName: 'أحمد محمد', doctorName: 'د. علي', date: '2023-10-25', time: '09:00', type: 'RootCanal', status: 'Confirmed', duration: 60 },
  { id: '2', patientId: '2', patientName: 'سارة علي', doctorName: 'د. علي', date: '2023-10-25', time: '10:30', type: 'Checkup', status: 'Completed', duration: 30 },
  { id: '3', patientId: '3', patientName: 'حسين كاظم', doctorName: 'د. علي', date: '2023-10-25', time: '11:30', type: 'Surgery', status: 'Pending', duration: 90 },
];

const mockStaff: Staff[] = [
  { id: '1', name: 'د. علي', role: 'Doctor', phone: '0770123456', salary: 2000000, avatar: 'https://picsum.photos/100/100?random=10', status: 'Active' },
  { id: '2', name: 'نور', role: 'Receptionist', phone: '0780123456', salary: 600000, avatar: 'https://picsum.photos/100/100?random=11', status: 'Active' },
];

const mockAssets: Asset[] = [
  { id: '1', name: 'كرسي أسنان A1', category: 'Equipment', quantity: 1, status: 'Good', purchaseDate: '2022-01-01', minLevel: 1, unit: 'Unit', supplier: 'Dental Depot' },
  { id: '2', name: 'مخدر موضعي', category: 'Consumable', quantity: 5, status: 'Low Stock', purchaseDate: '2023-10-01', minLevel: 10, unit: 'Box', supplier: 'Pharma Co' },
  { id: '3', name: 'جهاز أشعة X-Ray', category: 'Equipment', quantity: 1, status: 'Maintenance', purchaseDate: '2021-06-15', minLevel: 1, unit: 'Unit', supplier: 'Tech Med' },
];

// Basic treatments list for the "Treatments" asset tab
const mockTreatmentsList = [
    { id: '1', name: 'حشوة تجميلية', category: 'Treatment', quantity: 0, minLevel: 0, unit: 'Service', supplier: '-', price: 45000, cost: 15000 },
    { id: '2', name: 'سحب عصب (1 قناة)', category: 'Treatment', quantity: 0, minLevel: 0, unit: 'Service', supplier: '-', price: 80000, cost: 25000 },
    { id: '3', name: 'قلع بسيط', category: 'Treatment', quantity: 0, minLevel: 0, unit: 'Service', supplier: '-', price: 25000, cost: 5000 },
];

const mockTransactions: Transaction[] = [
  { id: 't1', title: 'دفعة علاج (أحمد)', amount: 150000, type: 'Income', date: '2023-10-25', category: 'Treatment', method: 'Cash' },
  { id: 't2', title: 'شراء مواد طبية', amount: 320000, type: 'Expense', date: '2023-10-24', category: 'Supplies', method: 'ZainCash' },
  { id: 't3', title: 'دفعة مختبر النخبة', amount: 85000, type: 'Expense', date: 'أمس 02:15', category: 'Lab', method: 'Cash' },
];

const mockLabRequests: LabRequest[] = [
  { id: '101', patientName: 'أحمد محمد', labName: 'مختبر النخبة', item: 'Zirconia Crown', status: 'InWork', requestDate: '2023-10-20', dueDate: '2023-10-27', cost: 85000 },
  { id: '102', patientName: 'منى حسن', labName: 'مختبر بغداد', item: 'PFM Bridge', status: 'Delivered', requestDate: '2023-10-15', dueDate: '2023-10-22', cost: 120000 },
];

const mockLabDirectory = [
    { id: 1, name: 'مختبر النخبة الرقمي', location: 'بغداد، المنصور', rating: 4.9, specialty: 'CAD/CAM', phone: '077000000' },
    { id: 2, name: 'مختبر الابتسامة', location: 'بغداد، الكرادة', rating: 4.5, specialty: 'Orthodontics', phone: '078000000' },
    { id: 3, name: 'مختبر التاج الذهبي', location: 'البصرة', rating: 4.2, specialty: 'Ceramics', phone: '075000000' },
];

export const ClinicDashboard: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'bookings' | 'treatment' | 'lab' | 'finance' | 'assets' | 'staff' | 'reports'>('overview');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientSubTab, setPatientSubTab] = useState<'overview' | 'plan' | 'smart' | 'archive' | 'history' | 'finance'>('plan');
  
  // New State for Treatment Details
  const [selectedTreatmentType, setSelectedTreatmentType] = useState<string | null>(null);

  // --- Global State (Simulated) ---
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [treatments, setTreatments] = useState(mockTreatmentsList);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [tasks, setTasks] = useState<HubTask[]>([
      { id: '1', title: 'صيانة كرسي العيادة 2', dueDate: 'غداً 10:00 ص', status: 'Pending', priority: 'Medium' }
  ]); 

  // --- Helper Logic ---
  const lowStockItems = assets.filter(a => a.category === 'Consumable' && a.quantity <= a.minLevel);
  const incomeTotal = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const expenseTotal = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const netIncome = incomeTotal - expenseTotal;
  
  // --- Detailed Tab Components ---

  const OverviewTab = () => (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Quick Actions Bar */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
         <button onClick={() => setActiveTab('bookings')} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 whitespace-nowrap"><Plus size={16}/> موعد جديد</button>
         <button onClick={() => setActiveTab('patients')} className="flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap hover:bg-slate-50"><Users size={16}/> إضافة مريض</button>
         <button onClick={() => setActiveTab('finance')} className="flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap hover:bg-slate-50"><DollarSign size={16}/> تسجيل دفعة</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div><p className="text-slate-400 text-xs mb-1">المرضى</p><h3 className="text-2xl font-bold text-slate-800">1,245</h3></div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users size={18} /></div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 w-fit px-2 py-0.5 rounded-full"><TrendingUp size={10}/> +12% هذا الشهر</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div><p className="text-slate-400 text-xs mb-1">المواعيد</p><h3 className="text-2xl font-bold text-slate-800">18</h3></div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Calendar size={18} /></div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-amber-600 font-bold"><Clock size={10}/> 3 قيد الانتظار</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
           <div className="flex justify-between items-start relative z-10">
            <div><p className="text-slate-400 text-xs mb-1">الإيرادات</p><h3 className="text-2xl font-bold text-emerald-600">850K</h3></div>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign size={18} /></div>
          </div>
           <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full w-[70%] rounded-full"></div></div>
        </div>

        <div 
          className={`p-4 rounded-2xl shadow-sm border cursor-pointer transition-all hover:scale-[1.02] relative overflow-hidden ${lowStockItems.length > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'}`}
          onClick={() => setActiveTab('assets')}
        >
          <div className="flex justify-between items-start relative z-10">
             <div>
               <div className={`text-xs mb-1 ${lowStockItems.length > 0 ? 'text-red-600 font-bold' : 'text-slate-400'}`}>المخزون</div>
               <div className={`text-2xl font-bold ${lowStockItems.length > 0 ? 'text-red-700' : 'text-slate-800'}`}>{lowStockItems.length}</div>
             </div>
             <AlertTriangle size={18} className={lowStockItems.length > 0 ? 'text-red-500' : 'text-slate-300'} />
          </div>
          <div className="text-[10px] mt-3 opacity-70">{lowStockItems.length > 0 ? 'مواد منتهية' : 'وضع مستقر'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 h-72">
          <h3 className="font-bold text-slate-700 mb-4">الإيرادات الأسبوعية</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="income" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 h-72 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700">المهام العاجلة</h3>
            <button className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">عرض الكل</button>
          </div>
          <div className="space-y-3">
            {lowStockItems.slice(0,2).map(item => (
                <div key={'task-'+item.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100 animate-pulse">
                  <div className="mt-1 bg-red-500 w-2 h-2 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">نقص في {item.name}</p>
                    <p className="text-xs text-slate-500">المتبقي: {item.quantity} {item.unit}</p>
                  </div>
                  <button className="text-[10px] bg-white border border-red-200 text-red-600 px-2 py-1 rounded font-bold">طلب</button>
                </div>
            ))}
            
            {tasks.map(task => (
                <div key={task.id} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${task.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{task.title}</p>
                    <p className="text-[10px] text-slate-500">{task.dueDate}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BookingsTab = () => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return { day: d.getDate(), name: d.toLocaleDateString('ar-IQ', { weekday: 'short' }), full: d.toISOString().split('T')[0] };
    });
    const [selectedDay, setSelectedDay] = useState(days[0].full);
    const [bookingFilter, setBookingFilter] = useState<'All'|'Confirmed'|'Pending'>('All');

    return (
      <div className="space-y-4 pb-20 animate-fade-in h-full flex flex-col">
         <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">جدول المواعيد</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg text-sm font-bold">
              <Plus size={16} /> موعد جديد
            </button>
         </div>
         
         {/* Horizontal Calendar */}
         <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 min-w-max">
              {days.map((d, idx) => (
                <button key={idx} onClick={() => setSelectedDay(d.full)}
                  className={`flex flex-col items-center justify-center w-14 h-20 rounded-xl transition-all ${selectedDay === d.full ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                  <span className="text-xs font-medium">{d.name}</span>
                  <span className="text-xl font-bold">{d.day}</span>
                </button>
              ))}
            </div>
         </div>

         <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Confirmed', 'Pending'].map(f => (
                <button key={f} onClick={() => setBookingFilter(f as any)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${bookingFilter === f ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}`}>
                    {f === 'All' ? 'الكل' : f === 'Confirmed' ? 'مؤكدة' : 'قيد الانتظار'}
                </button>
            ))}
         </div>

         {/* List */}
         <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 overflow-y-auto">
            <div className="space-y-4">
               {mockAppointments.filter(a => bookingFilter === 'All' || a.status === bookingFilter).map(app => (
                 <div key={app.id} className="flex gap-4 relative pl-10 group">
                    {/* Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-100 group-last:bottom-auto group-last:h-full"></div>
                    
                    <div className="w-16 flex-shrink-0 pt-1 z-10">
                       <span className="text-sm font-bold text-slate-800 block">{app.time}</span>
                       <span className="text-[10px] text-slate-400">{app.duration} دقيقة</span>
                    </div>
                    
                    <div className={`flex-1 p-3 rounded-xl border-r-4 shadow-sm transition-all hover:shadow-md cursor-pointer
                      ${app.status === 'Confirmed' ? 'bg-blue-50 border-blue-500' : ''}
                      ${app.status === 'Completed' ? 'bg-green-50 border-green-500' : ''}
                      ${app.status === 'Pending' ? 'bg-amber-50 border-amber-500' : ''}
                    `}>
                       <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-800">{app.patientName}</h4>
                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <Stethoscope size={10}/> {app.type}
                            </p>
                          </div>
                          {app.status === 'Confirmed' && <CheckCircle size={16} className="text-blue-500"/>}
                          {app.status === 'Pending' && <Clock size={16} className="text-amber-500"/>}
                          {app.status === 'Completed' && <CheckCircle size={16} className="text-green-500"/>}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    );
  };

  const LabTab = () => {
    const [labView, setLabView] = useState<'overview' | 'my_requests' | 'directory'>('overview');

    return (
      <div className="space-y-4 pb-20 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">مركز المختبرات</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                <Plus size={16}/> طلب جديد
            </button>
        </div>

        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex mb-2">
           {[{id:'overview', l:'نظرة عامة'}, {id:'my_requests', l:'طلباتي'}, {id:'directory', l:'الدليل'}].map(t => (
             <button key={t.id} onClick={() => setLabView(t.id as any)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${labView === t.id ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>{t.l}</button>
           ))}
        </div>

        {labView === 'overview' && (
            <div className="space-y-4 animate-slide-up">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">طلبات قيد الانتظار</p>
                        <h3 className="text-2xl font-bold text-amber-500">5</h3>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">مصاريف المختبر</p>
                        <h3 className="text-2xl font-bold text-indigo-600">1.2M</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-700 mb-4">حالة الطلبات</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={[{name: 'قيد العمل', value: 5}, {name: 'مكتمل', value: 12}, {name: 'تم التسليم', value: 8}]} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                                    <Cell fill="#f59e0b"/><Cell fill="#4f46e5"/><Cell fill="#10b981"/>
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2 text-[10px]">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> قيد العمل</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> مكتمل</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> تم التسليم</span>
                    </div>
                </div>
            </div>
        )}

        {labView === 'my_requests' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-slide-up">
                <div className="divide-y divide-slate-50">
                    {mockLabRequests.map(req => (
                        <div key={req.id} className="p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                        <TestTube size={16} className="text-indigo-500"/>
                                        {req.item}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">المريض: {req.patientName} • {req.labName}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                                    req.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                    req.status === 'InWork' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                    {req.status === 'Delivered' ? 'واصل' : req.status === 'InWork' ? 'قيد العمل' : 'معلق'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-3 text-xs text-slate-400 border-t border-slate-50 pt-2">
                                <span className="flex items-center gap-1"><Calendar size={12}/> تسليم: {req.dueDate}</span>
                                <span className="font-bold text-slate-600">{req.cost.toLocaleString()} د.ع</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {labView === 'directory' && (
            <div className="space-y-3 animate-slide-up">
                <div className="relative">
                    <input type="text" placeholder="بحث عن مختبر، تخصص..." className="w-full pl-4 pr-10 py-3 rounded-xl border-none bg-white shadow-sm outline-none text-sm"/>
                    <Search className="absolute right-3 top-3.5 text-slate-400" size={18} />
                </div>
                {mockLabDirectory.map(lab => (
                    <div key={lab.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                            <Home size={24}/>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-800">{lab.name}</h4>
                                <div className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-bold">
                                    <Star size={10} fill="currentColor"/> {lab.rating}
                                </div>
                            </div>
                            <p className="text-xs text-indigo-600 mb-1">{lab.specialty}</p>
                            <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-3"><MapPin size={10}/> {lab.location}</p>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">تواصل</button>
                                <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center"><Phone size={12}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    );
  };

  const PatientsTab = () => (
      <div className="space-y-4 pb-20 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">سجل المرضى</h2>
            <div className="flex gap-2">
                <button className="bg-white p-2 rounded-xl border border-slate-100 text-slate-600 shadow-sm"><Search size={20}/></button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"><Plus size={16}/> مريض جديد</button>
            </div>
        </div>
        
        <div className="grid gap-3">
            {mockPatients.map(patient => (
                <div key={patient.id} onClick={() => { setSelectedPatient(patient); setActiveTab('treatment'); }} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer hover:border-indigo-200 transition-all group">
                    <div className="flex items-center gap-3">
                        <img src={patient.avatar} className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-50 group-hover:ring-indigo-100"/>
                        <div>
                            <h4 className="font-bold text-slate-800">{patient.name}</h4>
                            <p className="text-xs text-slate-500">{patient.phone} • {patient.gender === 'Male' ? 'ذكر' : 'أنثى'} ({patient.age})</p>
                            <div className="flex gap-2 mt-1">
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                    patient.condition === 'Critical' ? 'bg-red-50 text-red-600' : 
                                    patient.condition === 'Treatment' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                }`}>
                                    {patient.condition === 'Critical' ? 'حالة حرجة' : patient.condition === 'Treatment' ? 'تحت العلاج' : 'مستقر'}
                                </span>
                                {patient.debt > 0 && <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-bold flex items-center gap-1"><DollarSign size={8}/> عليه ديون</span>}
                            </div>
                        </div>
                    </div>
                    <button className="p-2 bg-slate-50 text-indigo-600 rounded-xl hover:bg-indigo-50"><FileText size={20} /></button>
                </div>
            ))}
        </div>
      </div>
  );

  // Finance Tab
  const FinanceTab = () => {
    const [financeView, setFinanceView] = useState<'overview'|'income'|'expense'>('overview');
    const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);
    const [transType, setTransType] = useState<'Income'|'Expense'>('Income');

    const handleAddTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newTrans: Transaction = {
            id: Date.now().toString(),
            title: transType === 'Income' 
                ? `إيراد: ${((form.elements.namedItem('treatment') as HTMLSelectElement)?.value || 'علاج')}` 
                : `صرف: ${((form.elements.namedItem('category') as HTMLSelectElement)?.value || 'عام')}`,
            amount: Number((form.elements.namedItem('amount') as HTMLInputElement).value),
            type: transType,
            category: transType === 'Income' 
                ? 'Treatment' 
                : (form.elements.namedItem('category') as HTMLSelectElement).value as any,
            date: new Date().toISOString().split('T')[0],
            method: 'Cash'
        };
        setTransactions([newTrans, ...transactions]);
        setAddTransactionOpen(false);
    };

    return (
      <div className="space-y-4 pb-20 animate-fade-in">
        <div className="flex justify-between items-center">
           <h2 className="text-xl font-bold text-slate-800">المالية</h2>
           <button onClick={() => setAddTransactionOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg text-sm"><Plus size={16}/> عملية</button>
        </div>
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex mb-2">
           {[{id: 'overview', l: 'نظرة عامة'}, {id: 'income', l: 'الإيرادات'}, {id: 'expense', l: 'الصرفيات'}].map(t => (
               <button key={t.id} onClick={() => setFinanceView(t.id as any)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${financeView === t.id ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>{t.l}</button>
           ))}
        </div>
        {financeView === 'overview' && (
            <div className="grid grid-cols-3 gap-3 animate-slide-up">
                <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-sm"><div className="text-[10px] opacity-80 mb-1">الإيرادات</div><div className="font-bold text-sm">{incomeTotal.toLocaleString()}</div></div>
                <div className="bg-red-500 text-white p-3 rounded-2xl shadow-sm"><div className="text-[10px] opacity-80 mb-1">المصروفات</div><div className="font-bold text-sm">{expenseTotal.toLocaleString()}</div></div>
                <div className="bg-slate-800 text-white p-3 rounded-2xl shadow-sm"><div className="text-[10px] opacity-80 mb-1">الصافي</div><div className="font-bold text-sm">{(incomeTotal - expenseTotal).toLocaleString()}</div></div>
            </div>
        )}
        
        {(financeView === 'income' || financeView === 'expense') && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 animate-slide-up">
                <div className="divide-y divide-slate-50">
                    {transactions.filter(t => t.type === (financeView === 'income' ? 'Income' : 'Expense')).map(t => (
                        <div key={t.id} className="p-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'Income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{t.category === 'Lab' ? <TestTube size={14}/> : <DollarSign size={14}/>}</div>
                                <div><p className="text-sm font-bold text-slate-800">{t.title}</p><p className="text-[10px] text-slate-400">{t.date}</p></div>
                            </div>
                            <span className={`font-bold text-sm ${t.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>{t.amount.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Advanced Transaction Modal */}
        {isAddTransactionOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-4 overflow-hidden animate-scale-up">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">إضافة عملية مالية</h3>
                        <button onClick={() => setAddTransactionOpen(false)} className="p-1 bg-slate-100 rounded-full"><Settings size={16}/></button>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                        <button onClick={() => setTransType('Income')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${transType === 'Income' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500'}`}>إيراد (+)</button>
                        <button onClick={() => setTransType('Expense')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${transType === 'Expense' ? 'bg-red-500 text-white shadow' : 'text-slate-500'}`}>صرف (-)</button>
                    </div>
                    <form onSubmit={handleAddTransaction} className="space-y-3">
                        {transType === 'Income' ? (
                            <>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">المريض</label>
                                    <select name="patient" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none">
                                        {mockPatients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">الطبيب المعالج</label>
                                    <select name="doctor" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none">
                                        {mockStaff.filter(s => s.role === 'Doctor').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">نوع العلاج</label>
                                    <select name="treatment" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none">
                                        {treatments.map(t => <option key={t.id} value={t.name}>{t.name} ({t.price})</option>)}
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">نوع الصرفيات</label>
                                    <select name="category" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none">
                                        <option value="Salary">رواتب</option>
                                        <option value="Rent">إيجار</option>
                                        <option value="Electricity">كهرباء</option>
                                        <option value="Supplies">مخزون ومواد</option>
                                        <option value="Equipment">أجهزة</option>
                                        <option value="Lab">مختبر</option>
                                        <option value="Other">أخرى</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">التفاصيل</label>
                                    <textarea name="details" rows={2} className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none resize-none" placeholder="اكتب تفاصيل إضافية..."></textarea>
                                </div>
                            </>
                        )}
                        
                        <div>
                            <label className="text-xs font-bold text-slate-500 mb-1 block">المبلغ (د.ع)</label>
                            <input name="amount" type="number" required className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none font-bold text-slate-800"/>
                        </div>

                        <button className={`w-full py-3 rounded-xl font-bold text-white shadow-lg mt-2 ${transType === 'Income' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                            {transType === 'Income' ? 'تسجيل الإيراد' : 'تسجيل المصروف'}
                        </button>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
  };

  const PhysicalAssetsTab = () => {
    const [assetView, setAssetView] = useState<'inventory' | 'equipment' | 'treatments'>('inventory');
    
    // Reuse existing components for Inventory/Equipment but handle view switching
    // ... existing implementation ...
    
    return (
      <div className="space-y-4 pb-20 animate-fade-in">
         <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">الأصول المادية</h2></div>
         
         <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex mb-2">
             <button onClick={() => setAssetView('inventory')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${assetView === 'inventory' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>المخزون</button>
             <button onClick={() => setAssetView('equipment')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${assetView === 'equipment' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>الأجهزة</button>
             <button onClick={() => setAssetView('treatments')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${assetView === 'treatments' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>العلاجات</button>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="divide-y divide-slate-50">
               {/* Logic to switch between lists */}
               {assetView === 'treatments' ? (
                   treatments.map(item => (
                       <div key={item.id} className="p-4 flex justify-between items-center">
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600"><ClipboardList size={20}/></div>
                               <div><h4 className="font-bold text-slate-800 text-sm">{item.name}</h4><p className="text-[10px] text-slate-400">سعر: {item.price}</p></div>
                           </div>
                           <div className="text-center"><span className="block font-bold text-slate-800 text-xs">كلفة: {item.cost}</span></div>
                       </div>
                   ))
               ) : (
                   assets.filter(a => (assetView === 'inventory' ? a.category === 'Consumable' : a.category === 'Equipment')).map(item => (
                       <div key={item.id} className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><Box size={20}/></div>
                              <div><h4 className="font-bold text-slate-800 text-sm">{item.name}</h4><p className="text-[10px] text-slate-400">{item.category}</p></div>
                          </div>
                          <div className="text-center"><span className="block font-bold text-slate-800">{item.quantity}</span><span className="text-[10px] text-slate-400">{item.unit}</span></div>
                       </div>
                   ))
               )}
            </div>
         </div>
      </div>
    );
  };

  const StaffTab = () => (
      <div className="space-y-4 pb-20 animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800">الطاقم</h2>
          <div className="grid grid-cols-2 gap-3">
              {mockStaff.map(s => (<div key={s.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center"><div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-2"></div><h4 className="font-bold text-sm">{s.name}</h4><p className="text-[10px] text-slate-500">{s.role}</p></div>))}
          </div>
      </div>
  );

  const ReportsTab = () => (<div className="text-center py-10 text-slate-400">التقارير قيد التطوير</div>);

  const TreatmentPlanView = () => (
    <div className="pb-20 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setActiveTab('patients')} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600"><ChevronRight size={20}/></button>
            <div><h2 className="text-xl font-bold text-slate-800">{selectedPatient ? selectedPatient.name : 'مريض'}</h2></div>
        </div>
        <DentalChart 
            onToothClick={(id) => console.log('Clicked tooth:', id)} 
            onUpdateTooth={(id, status, notes, details) => console.log('Updated:', id, status, notes, details)}
        />
    </div>
  );

  // --- Main Render ---
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm z-20 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200"><Stethoscope size={24} /></div>
            <div><h1 className="font-extrabold text-xl text-slate-900 tracking-tight">عيادة النخبة</h1><div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-fit"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> مفتوح الآن</div></div>
          </div>
          <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 relative"><Bell size={20}/><span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span></button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {[{ id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard }, { id: 'bookings', label: 'الجدول', icon: Calendar }, { id: 'patients', label: 'المرضى', icon: Users }, { id: 'finance', label: 'المالية', icon: DollarSign }, { id: 'assets', label: 'الأصول', icon: Box }, { id: 'lab', label: 'المختبر', icon: TestTube }, { id: 'staff', label: 'الطاقم', icon: UserCog }].map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${activeTab === item.id ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'}`}><item.icon size={14} />{item.label}</button>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'finance' && <FinanceTab />}
        {activeTab === 'assets' && <PhysicalAssetsTab />} 
        {activeTab === 'bookings' && <BookingsTab />} 
        {activeTab === 'patients' && <PatientsTab />}
        {activeTab === 'lab' && <LabTab />}
        {activeTab === 'staff' && <StaffTab />}
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'treatment' && <TreatmentPlanView />}
      </div>
    </div>
  );
};