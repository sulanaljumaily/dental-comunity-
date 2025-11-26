
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ClinicDashboard } from './features/ClinicDashboard';
import { UserRole, AppView, Job, DoctorProfile, Clinic, HubTask, HubMessage, HubNotification } from './types';
import { 
  Stethoscope, ShoppingBag, TestTube, ShieldCheck, 
  MapPin, Search, ArrowRight, User, Activity, FileText,
  Building2, Briefcase, Users, Settings, Plus, Package, Truck,
  Bell, MessageSquare, CheckCircle, Clock, Heart, Share2, ThumbsUp,
  Filter, ShoppingCart, CreditCard, Star, MoreHorizontal, Zap, AlertTriangle, Phone, BriefcaseBusiness,
  Calendar, X, LogOut, ChevronRight, Check
} from 'lucide-react';

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scale-up">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full"><X size={20} className="text-slate-500"/></button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.GUEST);
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);

  // --- Mock Data ---
  const [jobs, setJobs] = useState<Job[]>([
    { id: '1', title: 'طبيب أسنان عام', clinicName: 'عيادة الابتسامة', location: 'بغداد، المنصور', type: 'Full-time', salaryRange: '1.5M - 2.5M', postedAt: 'منذ يومين', requirements: ['خبرة سنتين', 'إجادة حشوات التجميل'], logo: 'https://picsum.photos/50/50?random=1' },
    { id: '2', title: 'مساعد طبيب أسنان', clinicName: 'مركز دجلة التخصصي', location: 'أربيل', type: 'Part-time', salaryRange: '600K - 800K', postedAt: 'منذ 5 ساعات', requirements: ['خريج معهد صحي', 'لغة كردية وعربية'], logo: 'https://picsum.photos/50/50?random=2' },
  ]);

  const [doctors, setDoctors] = useState<DoctorProfile[]>([
    { id: '1', name: 'د. علي حسين', specialty: 'جراحة وجه وفكين', location: 'بغداد', experience: 5, isAvailable: true, bio: 'اختصاص دقيق في زراعة الأسنان، بورد عربي.', avatar: 'https://picsum.photos/100/100?random=10' },
    { id: '2', name: 'د. سارة محمد', specialty: 'طبيب عام', location: 'النجف', experience: 1, isAvailable: true, bio: 'خريجة حديثة، الأولى على الدفعة.', avatar: 'https://picsum.photos/100/100?random=11' },
  ]);

  const [searchJob, setSearchJob] = useState('');

  // --- Views ---

  const LandingView = () => (
    <div className="p-4 pb-24 space-y-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-black text-slate-800">DentIraq</h1><p className="text-xs text-slate-500">منصة طب الأسنان الأولى</p></div>
        <button onClick={() => setCurrentView(AppView.LOGIN)} className="bg-indigo-600 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-indigo-200">تسجيل الدخول</button>
      </div>
      <div className="w-full h-44 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-lg flex items-center px-6 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-[70%]"><h2 className="text-xl font-bold mb-2 leading-tight">خدمات طبية متكاملة</h2><p className="text-xs opacity-90 mb-4">احجز موعدك الآن مع أفضل أطباء الأسنان</p><button onClick={() => setCurrentView(AppView.MEDICAL_SERVICES)} className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">تصفح العيادات</button></div>
        <Stethoscope className="absolute -left-4 -bottom-4 opacity-10 w-40 h-40 rotate-12" /><div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800 flex items-center gap-2"><MapPin size={18} className="text-indigo-500" />عيادات قريبة</h3><button onClick={() => setCurrentView(AppView.MEDICAL_SERVICES)} className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">عرض الخريطة</button></div>
        <div className="space-y-3">{[1, 2].map((i) => (
            <div key={i} onClick={() => setCurrentView(AppView.MEDICAL_SERVICES)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start"><div className="flex gap-3"><div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-300"><Building2 size={24} /></div><div><h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">عيادة النخبة التخصصية</h4><p className="text-xs text-slate-500 mt-1">المنصور، شارع 14 رمضان</p><div className="flex items-center gap-2 mt-2"><span className="bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded text-[10px] font-medium">★ 4.8</span></div></div></div><button className="bg-indigo-50 p-2 rounded-xl text-indigo-600"><ArrowRight size={16} /></button></div>
            </div>
          ))}</div>
      </div>
    </div>
  );

  const LoginView = () => (
    <div className="p-6 flex flex-col justify-center min-h-screen bg-white">
       <div className="mb-8 text-center animate-fade-in">
         <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-indigo-200 rotate-3"><Activity size={40} /></div>
         <h1 className="text-3xl font-black text-slate-800 mb-2">DentIraq</h1><p className="text-slate-500">اختر نوع الحساب للمتابعة</p>
       </div>
       <div className="grid gap-4 animate-slide-up">
         <button onClick={() => {setCurrentUserRole(UserRole.DENTIST_OWNER); setCurrentView(AppView.DOCTORS_HUB);}} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 hover:border-indigo-600 hover:bg-indigo-50 transition-all group text-right"><div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600"><Stethoscope size={24} /></div><div><div className="font-bold text-slate-800 text-lg">طبيب أسنان</div></div></button>
         <button onClick={() => {setCurrentUserRole(UserRole.SUPPLIER); setCurrentView(AppView.SUPPLIER_HUB);}} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 hover:border-pink-600 hover:bg-pink-50 transition-all group text-right"><div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600"><ShoppingBag size={24} /></div><div><div className="font-bold text-slate-800 text-lg">مورد مواد</div></div></button>
         <button onClick={() => {setCurrentUserRole(UserRole.LAB); setCurrentView(AppView.LAB_HUB);}} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 hover:border-blue-600 hover:bg-blue-50 transition-all group text-right"><div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"><TestTube size={24} /></div><div><div className="font-bold text-slate-800 text-lg">مختبر / معمل</div></div></button>
         <button onClick={() => {setCurrentUserRole(UserRole.ADMIN); setCurrentView(AppView.PLATFORM_ADMIN);}} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 hover:border-slate-800 hover:bg-slate-50 transition-all group text-right"><div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600"><ShieldCheck size={24} /></div><div><div className="font-bold text-slate-800 text-lg">إدارة المنصة</div></div></button>
       </div>
       <button onClick={() => setCurrentView(AppView.LANDING)} className="mt-8 text-slate-400 text-sm">الدخول كزائر</button>
    </div>
  );

  const MedicalServicesView = () => (
    <div className="pb-24 bg-slate-50 min-h-full animate-fade-in relative">
       <div className="bg-blue-600 h-48 rounded-b-[40px] relative z-0 shadow-lg">
          <div className="p-6 text-white">
             <div className="flex justify-between items-start">
                <div><h1 className="text-2xl font-black mb-1">الخدمات الطبية</h1><p className="text-blue-100 text-sm">اكتشف جميع الخدمات الطبية المتاحة</p></div>
                <button onClick={() => setCurrentView(AppView.LOGIN)} className="bg-blue-500/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-400/30"><User size={16} /> هل أنت طبيب؟</button>
             </div>
          </div>
       </div>
       <div className="px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl p-2 border border-slate-100">
             <div className="bg-blue-50 p-3 rounded-2xl mb-2 flex items-center gap-3 border border-blue-100">
                <MapPin className="text-blue-600" size={20} />
                <input type="text" placeholder="عيادات قريبة" className="bg-transparent w-full outline-none text-sm text-slate-700 font-bold placeholder:text-blue-300 placeholder:font-normal"/>
             </div>
             <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 transition-colors group"><Zap size={24} className="text-slate-700 group-hover:text-amber-500 transition-colors mb-1"/><span className="text-[10px] font-bold text-slate-600">تشخيص ذكي</span></button>
                <button className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 transition-colors group"><AlertTriangle size={24} className="text-slate-700 group-hover:text-red-500 transition-colors mb-1"/><span className="text-[10px] font-bold text-slate-600">طوارئ</span></button>
                 <button className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 transition-colors group"><FileText size={24} className="text-slate-700 group-hover:text-blue-500 transition-colors mb-1"/><span className="text-[10px] font-bold text-slate-600">مقالات</span></button>
             </div>
          </div>
       </div>
       <div className="px-4 mt-6 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
             <div className="flex items-start gap-3 mb-3">
                 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-lg">:)</div>
                 <div className="flex-1"><h3 className="font-bold text-slate-800">مركز الابتسامة</h3><div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5"><Star size={12} fill="currentColor"/> 4.9</div></div>
             </div>
             <div className="flex gap-3"><button className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-bold text-sm shadow-lg">حجز الآن</button></div>
          </div>
       </div>
    </div>
  );

  // --- Doctors Hub View (Fully Implemented) ---
  const DoctorsHubView = () => {
    const [hubSection, setHubSection] = useState<'overview'|'clinics'|'tasks'|'messages'|'notifications'|'profile'>('overview');
    
    // -- State for Hub --
    const [clinics, setClinics] = useState<Clinic[]>([
      { id: '1', name: 'عيادة المنصور التخصصية', location: 'بغداد، المنصور', patientsCount: 1450, todayAppointments: 12, status: 'Open', image: 'https://picsum.photos/100/100?random=100' },
      { id: '2', name: 'عيادة الحارثية', location: 'بغداد، الحارثية', patientsCount: 850, todayAppointments: 5, status: 'Closed', image: 'https://picsum.photos/100/100?random=101' }
    ]);
    const [tasks, setTasks] = useState<HubTask[]>([
      { id: '1', title: 'شراء مادة تخدير (Lidocaine)', dueDate: 'اليوم', status: 'Pending', priority: 'High', assignee: 'مساعد صيدلي' },
      { id: '2', title: 'تجديد اشتراك النقابة', dueDate: 'غداً', status: 'Pending', priority: 'Medium', assignee: 'المالك' },
      { id: '3', title: 'صيانة كرسي الأسنان رقم 2', dueDate: '2023-10-30', status: 'Done', priority: 'Low', assignee: 'فني صيانة' },
    ]);
    const [messages, setMessages] = useState<HubMessage[]>([
      { id: '1', sender: 'د. سارة (مساعد)', avatar: 'https://picsum.photos/50/50?random=200', preview: 'دكتور، المريض حسين وصل للعيادة.', time: '10:30 ص', unread: true, role: 'مساعد طبيب' },
      { id: '2', sender: 'مختبر النخبة', avatar: 'https://picsum.photos/50/50?random=201', preview: 'تم الانتهاء من عمل التاج للزيركون.', time: '09:15 ص', unread: false, role: 'مختبر' },
    ]);
    const [notifications, setNotifications] = useState<HubNotification[]>([
      { id: '1', title: 'تنبيه مخزون', description: 'مادة الكمبوزت قاربت على النفاذ في عيادة المنصور', time: 'منذ 30 دقيقة', type: 'Alert', read: false },
      { id: '2', title: 'طلب جديد', description: 'طلب توظيف جديد من د. علي', time: 'منذ ساعتين', type: 'Info', read: true },
    ]);

    const [isClinicModalOpen, setClinicModalOpen] = useState(false);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    // Hub Helpers
    const handleAddTask = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const newTask: HubTask = {
        id: Date.now().toString(),
        title: (form.elements.namedItem('title') as HTMLInputElement).value,
        dueDate: (form.elements.namedItem('date') as HTMLInputElement).value,
        status: 'Pending',
        priority: (form.elements.namedItem('priority') as HTMLSelectElement).value as any,
        assignee: 'أنا'
      };
      setTasks([newTask, ...tasks]);
      setTaskModalOpen(false);
    };

    const markTaskDone = (id: string) => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Done' } : t));
    };

    const totalPatients = clinics.reduce((acc, c) => acc + c.patientsCount, 0);
    const totalToday = clinics.reduce((acc, c) => acc + c.todayAppointments, 0);

    return (
      <div className="pb-24 bg-slate-50 min-h-full pt-4 px-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                 <img src="https://picsum.photos/200/200?random=99" className="w-full h-full object-cover"/>
              </div>
              <div>
                 <h2 className="font-bold text-slate-800">د. أحمد العراقي</h2>
                 <p className="text-xs text-slate-500">مالك عيادة • اشتراك Pro</p>
              </div>
           </div>
           <button onClick={() => setHubSection('profile')} className="p-2 bg-white rounded-full shadow-sm border border-slate-100 text-slate-600"><Settings size={20}/></button>
        </div>

        {/* Navigation Pills */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex gap-2 overflow-x-auto no-scrollbar mb-6">
           {[{id:'overview', l:'نظرة عامة'}, {id:'clinics', l:'العيادات'}, {id:'tasks', l:'المهام'}, {id:'messages', l:'الرسائل'}, {id:'notifications', l:'الإشعارات'}].map(s => (
             <button 
               key={s.id} 
               onClick={() => setHubSection(s.id as any)} 
               className={`flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${hubSection === s.id ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               {s.l}
               {s.id === 'notifications' && notifications.filter(n => !n.read).length > 0 && <span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block"></span>}
               {s.id === 'messages' && messages.filter(m => m.unread).length > 0 && <span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block"></span>}
             </button>
           ))}
        </div>

        {/* --- Hub Sections --- */}

        {hubSection === 'overview' && (
          <div className="space-y-4 animate-slide-up">
            <div className="bg-indigo-600 text-white p-5 rounded-3xl shadow-lg shadow-indigo-200 relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-indigo-100 text-xs mb-1">إجمالي المرضى (كل العيادات)</p>
                        <h2 className="text-4xl font-black mb-2">{totalPatients.toLocaleString()}</h2>
                     </div>
                     <Users size={24} className="text-indigo-300"/>
                  </div>
                  <div className="flex gap-2 mt-4">
                     {clinics.map(c => (
                        <span key={c.id} className="text-[10px] bg-white/10 px-2 py-1 rounded">{c.name.split(' ')[1]}: {c.patientsCount}</span>
                     ))}
                  </div>
               </div>
               <Activity className="absolute right-0 bottom-0 text-indigo-500 opacity-20 w-32 h-32"/>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3"><Calendar size={20}/></div>
                  <span className="text-xl font-bold text-slate-800 block">{totalToday}</span>
                  <span className="text-xs text-slate-400">موعد اليوم</span>
               </div>
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-3"><Activity size={20}/></div>
                  <span className="text-xl font-bold text-slate-800 block">{tasks.filter(t => t.status === 'Pending').length}</span>
                  <span className="text-xs text-slate-400">مهام معلقة</span>
               </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-3">أحدث الإشعارات</h3>
               <div className="space-y-3">
                  {notifications.slice(0, 2).map(n => (
                     <div key={n.id} className="flex gap-3 items-center p-2 rounded-lg hover:bg-slate-50">
                        <div className={`w-2 h-2 rounded-full ${n.type === 'Alert' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                        <div className="flex-1">
                           <p className="text-xs font-bold text-slate-800">{n.title}</p>
                           <p className="text-[10px] text-slate-400">{n.time}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {hubSection === 'clinics' && (
          <div className="space-y-4 animate-slide-up">
            <button onClick={() => setClinicModalOpen(true)} className="w-full py-3 border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors">
               <Plus size={20}/> إضافة عيادة جديدة
            </button>
            
            <div className="space-y-4">
               {clinics.map(clinic => (
                  <div key={clinic.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                     <div className="h-24 bg-slate-200 relative">
                        <img src={clinic.image} className="w-full h-full object-cover opacity-80"/>
                        <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold ${clinic.status === 'Open' ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                           {clinic.status === 'Open' ? 'مفتوح الآن' : 'مغلق'}
                        </span>
                     </div>
                     <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <h3 className="font-bold text-slate-800 text-lg">{clinic.name}</h3>
                              <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={10}/> {clinic.location}</p>
                           </div>
                           <div className="text-center bg-indigo-50 p-2 rounded-xl min-w-[60px]">
                              <span className="block text-lg font-bold text-indigo-600">{clinic.todayAppointments}</span>
                              <span className="text-[8px] text-indigo-400">موعد اليوم</span>
                           </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-50">
                           <button onClick={() => setCurrentView(AppView.CLINIC_MANAGER)} className="bg-slate-800 text-white py-2 rounded-xl text-xs font-bold col-span-2">دخول لوحة التحكم</button>
                           <button className="bg-slate-100 text-slate-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1"><Settings size={14}/> إعدادات</button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <Modal isOpen={isClinicModalOpen} onClose={() => setClinicModalOpen(false)} title="إضافة عيادة جديدة">
               <div className="space-y-4 text-center py-6">
                  <Building2 size={48} className="mx-auto text-indigo-200 mb-2"/>
                  <p className="text-sm text-slate-500">هذه الميزة متاحة في النسخة الكاملة. يمكنك إضافة عدد لا محدود من العيادات.</p>
                  <button onClick={() => setClinicModalOpen(false)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold">حسناً</button>
               </div>
            </Modal>
          </div>
        )}

        {hubSection === 'tasks' && (
           <div className="space-y-4 animate-slide-up">
              <div className="flex justify-between items-center">
                 <h3 className="font-bold text-slate-800">قائمة المهام</h3>
                 <button onClick={() => setTaskModalOpen(true)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"><Plus size={14}/> مهمة</button>
              </div>

              <div className="space-y-3">
                 {tasks.map(task => (
                    <div key={task.id} className={`bg-white p-4 rounded-2xl border-r-4 shadow-sm flex justify-between items-center ${task.status === 'Done' ? 'border-green-500 opacity-60' : task.priority === 'High' ? 'border-red-500' : 'border-indigo-500'}`}>
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <span className={`text-[10px] px-2 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>{task.priority}</span>
                             {task.status === 'Done' && <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded">مكتمل</span>}
                          </div>
                          <h4 className={`font-bold text-sm ${task.status === 'Done' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{task.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-1">الموعد: {task.dueDate} • المسند: {task.assignee}</p>
                       </div>
                       {task.status !== 'Done' && (
                          <button onClick={() => markTaskDone(task.id)} className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-300 hover:border-green-500 hover:bg-green-50 hover:text-green-600 transition-all">
                             <Check size={16}/>
                          </button>
                       )}
                    </div>
                 ))}
              </div>

              <Modal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} title="إضافة مهمة جديدة">
                 <form onSubmit={handleAddTask} className="space-y-4">
                    <div><label className="text-xs font-bold block mb-1">عنوان المهمة</label><input name="title" required className="w-full p-3 bg-slate-50 rounded-xl text-sm"/></div>
                    <div className="grid grid-cols-2 gap-3">
                       <div><label className="text-xs font-bold block mb-1">تاريخ الاستحقاق</label><input name="date" type="date" required className="w-full p-3 bg-slate-50 rounded-xl text-sm"/></div>
                       <div>
                          <label className="text-xs font-bold block mb-1">الأولوية</label>
                          <select name="priority" className="w-full p-3 bg-slate-50 rounded-xl text-sm">
                             <option value="High">عالية</option>
                             <option value="Medium">متوسطة</option>
                             <option value="Low">منخفضة</option>
                          </select>
                       </div>
                    </div>
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">حفظ المهمة</button>
                 </form>
              </Modal>
           </div>
        )}

        {hubSection === 'messages' && (
           <div className="space-y-2 animate-slide-up">
              {messages.map(msg => (
                 <div key={msg.id} className={`bg-white p-3 rounded-xl border flex gap-3 items-center cursor-pointer hover:bg-slate-50 transition-colors ${msg.unread ? 'border-indigo-200 shadow-sm' : 'border-slate-100'}`}>
                    <div className="relative">
                       <img src={msg.avatar} className="w-12 h-12 rounded-full object-cover"/>
                       {msg.unread && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between mb-0.5">
                          <h3 className={`text-sm ${msg.unread ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>{msg.sender}</h3>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                       </div>
                       <p className="text-xs text-slate-500 line-clamp-1">{msg.preview}</p>
                       <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mt-1 inline-block">{msg.role}</span>
                    </div>
                 </div>
              ))}
           </div>
        )}

        {hubSection === 'notifications' && (
           <div className="space-y-3 animate-slide-up">
              {notifications.map(notif => (
                 <div key={notif.id} className={`p-3 rounded-xl border flex gap-3 items-start ${notif.read ? 'bg-white border-slate-100' : 'bg-blue-50 border-blue-100'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'Alert' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                       {notif.type === 'Alert' ? <AlertTriangle size={16}/> : <Bell size={16}/>}
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between">
                          <h4 className="font-bold text-sm text-slate-800">{notif.title}</h4>
                          <span className="text-[10px] text-slate-400">{notif.time}</span>
                       </div>
                       <p className="text-xs text-slate-500 mt-1">{notif.description}</p>
                       {!notif.read && <button className="text-[10px] text-indigo-600 font-bold mt-2">تحديد كمقروء</button>}
                    </div>
                 </div>
              ))}
           </div>
        )}

        {hubSection === 'profile' && (
           <div className="space-y-4 animate-slide-up">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
                 <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-slate-50">
                    <img src="https://picsum.photos/200/200?random=99" className="w-full h-full object-cover"/>
                 </div>
                 <h2 className="text-xl font-bold text-slate-800">د. أحمد العراقي</h2>
                 <p className="text-sm text-slate-500">جراحة وجه وفكين</p>
                 <div className="flex justify-center gap-2 mt-4">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Star size={12} fill="currentColor"/> باقة Pro</span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">ينتهي: 2024/12</span>
                 </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                 {[
                    {l: 'تعديل الملف الشخصي', i: User},
                    {l: 'إدارة الاشتراكات', i: CreditCard},
                    {l: 'كلمة المرور والأمان', i: ShieldCheck},
                    {l: 'المساعدة والدعم', i: MessageSquare},
                 ].map((item, i) => (
                    <button key={i} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-50 last:border-0">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500"><item.i size={18}/></div>
                          <span className="text-sm font-bold text-slate-700">{item.l}</span>
                       </div>
                       <ChevronRight size={16} className="text-slate-300"/>
                    </button>
                 ))}
              </div>

              <button onClick={() => setCurrentView(AppView.LOGIN)} className="w-full py-3 bg-red-50 text-red-600 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                 <LogOut size={18}/> تسجيل الخروج
              </button>
           </div>
        )}
      </div>
    );
  };

  const CommunityView = () => (
    <div className="pb-24 bg-slate-50 min-h-full pt-4 px-4 animate-fade-in">
       <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-black text-slate-800">المجتمع الطبي</h1><Bell className="text-slate-500"/></div>
       <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">{['الكل', 'النخبة', 'ندوات', 'دورات'].map((t,i)=><button key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold ${i===0?'bg-slate-800 text-white':'bg-white border border-slate-200 text-slate-600'}`}>{t}</button>)}</div>
       <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-4">
          <div className="flex gap-3 mb-3"><div className="w-10 h-10 bg-slate-200 rounded-full"></div><textarea className="flex-1 bg-slate-50 rounded-xl p-3 text-sm resize-none outline-none" placeholder="شارك حالة سريرية..."></textarea></div>
          <div className="flex justify-between items-center"><button className="text-slate-400"><MessageSquare size={18}/></button><button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold">نشر</button></div>
       </div>
       <div className="space-y-4">
          {[1,2].map(i => (
             <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 bg-slate-200 rounded-full"></div><div><h3 className="font-bold text-slate-800 text-sm">د. علي محمد</h3><p className="text-[10px] text-slate-400">أخصائي تقويم • منذ 2 ساعة</p></div></div>
                <p className="text-sm text-slate-600 mb-3">حالة تقويم معقدة...</p>
             </div>
          ))}
       </div>
    </div>
  );

  const JobsView = () => {
    const [jobsTab, setJobsTab] = useState<'overview'|'jobs'|'doctors'|'post'>('overview');
    const filteredJobs = jobs.filter(j => j.title.includes(searchJob) || j.location.includes(searchJob));

    return (
      <div className="pb-24 bg-slate-50 min-h-full pt-4 px-4 animate-fade-in">
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black text-slate-800">الوظائف</h1>
            {jobsTab !== 'post' && (<button onClick={() => setJobsTab('post')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"><Plus size={16}/> نشر</button>)}
         </div>
         <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex gap-1 mb-6">
            {[{id: 'overview', label: 'عام', icon: BriefcaseBusiness},{id: 'jobs', label: 'الفرص', icon: Search},{id: 'doctors', label: 'الدليل', icon: Users}].map(tab => (
              <button key={tab.id} onClick={() => setJobsTab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${jobsTab === tab.id ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}><tab.icon size={14}/> {tab.label}</button>
            ))}
         </div>
         {jobsTab === 'jobs' && (
            <div className="space-y-4 animate-slide-up">
               <div className="relative"><input type="text" value={searchJob} onChange={(e)=>setSearchJob(e.target.value)} placeholder="بحث عن وظيفة..." className="w-full pl-4 pr-10 py-3 rounded-2xl border-none bg-white shadow-sm outline-none text-sm"/><Search className="absolute right-3 top-3.5 text-slate-400" size={18}/></div>
               <div className="space-y-3">
                  {filteredJobs.length > 0 ? filteredJobs.map(job => (
                     <div key={job.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2"><h4 className="font-bold text-slate-800">{job.title}</h4><span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] font-bold">{job.type}</span></div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-50"><div className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12}/> {job.location}</div><div className="text-xs font-bold text-slate-700">{job.salaryRange}</div></div>
                     </div>
                  )) : <p className="text-center text-slate-400 py-10">لا توجد نتائج</p>}
               </div>
            </div>
         )}
         {jobsTab === 'overview' && (
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
               <div className="relative z-10 max-w-[70%]"><h2 className="text-xl font-black mb-2">ابحث عن وظيفتك المثالية</h2><button onClick={() => setJobsTab('jobs')} className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold">تصفح الوظائف</button></div>
            </div>
         )}
      </div>
    );
  };

  const StoreView = () => (
    <div className="pb-24 bg-slate-50 min-h-full pt-4 px-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-black text-slate-800">المتجر</h1><button className="p-2 bg-white rounded-full shadow-sm"><ShoppingCart size={20} className="text-slate-700"/></button></div>
      <div className="relative mb-4"><input type="text" placeholder="بحث عن منتجات..." className="w-full pl-4 pr-10 py-3 rounded-xl border-none bg-white shadow-sm outline-none"/><Search className="absolute right-3 top-3.5 text-slate-400" size={18}/></div>
      <div className="grid grid-cols-2 gap-3">
         {[1,2,3,4].map(i => (
            <div key={i} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
               <div className="h-28 bg-slate-100 rounded-xl mb-2 relative"><button className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-slate-400 text-sm hover:text-indigo-600">+</button></div>
               <h3 className="font-bold text-slate-800 text-sm mb-0.5">منتج {i}</h3>
               <div className="flex justify-between items-center"><span className="font-bold text-indigo-600 text-sm">45,000</span><button className="bg-slate-900 text-white p-1.5 rounded-lg"><ShoppingCart size={14}/></button></div>
            </div>
         ))}
      </div>
    </div>
  );

  const SupplierHubView = () => (<div className="flex justify-center items-center h-full text-slate-400">مركز الموردين</div>);
  const LabHubView = () => (<div className="flex justify-center items-center h-full text-slate-400">مركز المعامل</div>);
  const PlatformAdminView = () => (<div className="flex justify-center items-center h-full text-slate-400">إدارة المنصة</div>);

  const renderContent = () => {
    switch (currentView) {
      case AppView.LANDING: return <LandingView />;
      case AppView.LOGIN: return <LoginView />;
      case AppView.DOCTORS_HUB: return <DoctorsHubView />;
      case AppView.CLINIC_MANAGER: return <ClinicDashboard onNavigate={setCurrentView} />;
      case AppView.SUPPLIER_HUB: return <SupplierHubView />;
      case AppView.LAB_HUB: return <LabHubView />;
      case AppView.STORE: return <StoreView />;
      case AppView.COMMUNITY: return <CommunityView />;
      case AppView.JOBS: return <JobsView />;
      case AppView.PLATFORM_ADMIN: return <PlatformAdminView />;
      case AppView.MEDICAL_SERVICES: return <MedicalServicesView />;
      default: return <LandingView />;
    }
  };

  return <Layout view={currentView} role={currentUserRole} onNavigate={setCurrentView}>{renderContent()}</Layout>;
};

export default App;
