import React from 'react';
import { 
  Home, Stethoscope, ShoppingBag, MessageCircle, Briefcase, Menu, User, Building2
} from 'lucide-react';
import { AppView, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  view: AppView;
  role: UserRole;
  onNavigate: (view: AppView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, view, role, onNavigate }) => {
  
  // Bottom Navigation Configuration based on specific requirements
  const getNavItems = () => {
    if (role === UserRole.DENTIST_OWNER || role === UserRole.DENTIST_STAFF) {
      // Dentist Navigation: Clinic Manager, Community, Doctors Hub, Jobs, Store
      return [
        { id: AppView.CLINIC_MANAGER, label: 'ادارة العيادة', icon: Stethoscope },
        { id: AppView.COMMUNITY, label: 'المجتمع', icon: MessageCircle },
        { id: AppView.DOCTORS_HUB, label: 'مركز الاطباء', icon: Home },
        { id: AppView.JOBS, label: 'الوظائف', icon: Briefcase },
        { id: AppView.STORE, label: 'المتجر', icon: ShoppingBag },
      ];
    } else if (role === UserRole.SUPPLIER) {
      // Supplier Navigation
       return [
        { id: AppView.JOBS, label: 'الوظائف', icon: Briefcase },
        { id: AppView.SUPPLIER_HUB, label: 'مركز الموردين', icon: Home },
        { id: AppView.STORE, label: 'المتجر', icon: ShoppingBag },
       ]
    } else if (role === UserRole.LAB) {
      // Lab Navigation
       return [
        { id: AppView.JOBS, label: 'الوظائف', icon: Briefcase },
        { id: AppView.LAB_HUB, label: 'مركز المعامل', icon: Home },
        { id: AppView.STORE, label: 'المتجر', icon: ShoppingBag },
       ]
    } else if (role === UserRole.ADMIN) {
      // Admin Navigation
       return [
        { id: AppView.PLATFORM_ADMIN, label: 'الادارة', icon: Home },
        { id: AppView.COMMUNITY, label: 'المجتمع', icon: MessageCircle },
        { id: AppView.DOCTORS_HUB, label: 'الاطباء', icon: Stethoscope },
        { id: AppView.JOBS, label: 'الوظائف', icon: Briefcase },
        { id: AppView.STORE, label: 'المتجر', icon: ShoppingBag },
       ]
    } else {
      // Guest / Default
      return [
        { id: AppView.LANDING, label: 'الرئيسية', icon: Home },
        { id: AppView.DOCTORS_HUB, label: 'العيادات', icon: Stethoscope }, // Shows nearby
        { id: AppView.COMMUNITY, label: 'المقالات', icon: MessageCircle },
        { id: AppView.LOGIN, label: 'دخول', icon: User },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 max-w-md mx-auto relative shadow-2xl border-x border-slate-200 font-tajawal">
      {/* Main Content Scrollable Area */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>

      {/* Bottom Navigation Bar (Sticky) */}
      {view !== AppView.LOGIN && (
        <nav className="bg-white border-t border-slate-200 px-2 pb-5 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              // Highlight logic
              const isActive = view === item.id || 
                              (item.id === AppView.CLINIC_MANAGER && view === AppView.PATIENT_PROFILE) ||
                              (item.id === AppView.DOCTORS_HUB && role !== UserRole.GUEST && view === AppView.DOCTORS_HUB);
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1.5 p-1 rounded-xl transition-all duration-300 relative min-w-[60px]
                    ${isActive ? 'text-indigo-600 -translate-y-2' : 'text-slate-400 hover:text-slate-600'}
                  `}
                >
                  <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-transparent'}`}>
                    <item.icon size={isActive ? 20 : 22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-[10px] font-medium transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};