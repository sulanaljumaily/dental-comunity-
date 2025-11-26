import React, { useState } from 'react';
import { X, Check, AlertCircle, Shield, Activity, FileText, Crown, Clock, Zap } from 'lucide-react';

interface DentalChartProps {
  onToothClick: (id: number) => void;
  onUpdateTooth?: (id: number, status: string, notes: string, details?: any) => void;
}

const DentalChart: React.FC<DentalChartProps> = ({ onToothClick, onUpdateTooth }) => {
  const [selectedToothId, setSelectedToothId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('Healthy');
  const [notes, setNotes] = useState<string>('');
  const [reminder, setReminder] = useState<string>('');
  const [details, setDetails] = useState<any>({});
  
  // Local state to track teeth status for visualization
  const [teethData, setTeethData] = useState<Record<number, { status: string; notes: string; reminder?: string; details?: any }>>({});

  // Simplified numbering (Universal System 1-32)
  const topTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
  const bottomTeeth = Array.from({ length: 16 }, (_, i) => 32 - i);

  const handleToothClick = (id: number) => {
    setSelectedToothId(id);
    onToothClick(id);
    
    // Load existing data if present, otherwise reset to defaults
    const currentData = teethData[id] || { status: 'Healthy', notes: '', reminder: '', details: {} };
    setStatus(currentData.status);
    setNotes(currentData.notes);
    setReminder(currentData.reminder || '');
    setDetails(currentData.details || {});
  };

  const handleClose = () => {
    setSelectedToothId(null);
    setStatus('Healthy');
    setNotes('');
    setReminder('');
    setDetails({});
  };

  const handleSave = () => {
    if (selectedToothId) {
      // Update local state to reflect changes visually
      setTeethData(prev => ({
        ...prev,
        [selectedToothId]: { status, notes, reminder, details }
      }));

      if (onUpdateTooth) {
        onUpdateTooth(selectedToothId, status, notes, details);
      }
    }
    handleClose();
  };

  const updateDetail = (key: string, value: any) => {
    setDetails((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative p-4 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800">المخطط السني التفاعلي</h3>
        <div className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Universal System</div>
      </div>
      
      <div className="flex flex-col gap-6 overflow-x-auto no-scrollbar pb-2 px-2">
        {/* Upper Arch */}
        <div className="flex justify-center gap-1.5 min-w-max">
          {topTeeth.map((id) => (
            <Tooth 
              key={id} 
              id={id} 
              onClick={() => handleToothClick(id)} 
              isSelected={selectedToothId === id} 
              data={teethData[id]}
            />
          ))}
        </div>

        <div className="h-px bg-slate-100 w-full flex items-center justify-center">
           <div className="w-full border-t border-dashed border-slate-200"></div>
        </div>

        {/* Lower Arch */}
        <div className="flex justify-center gap-1.5 min-w-max">
          {bottomTeeth.map((id) => (
            <Tooth 
              key={id} 
              id={id} 
              onClick={() => handleToothClick(id)} 
              isSelected={selectedToothId === id} 
              data={teethData[id]}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex gap-3 text-xs text-slate-500 justify-center flex-wrap">
        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100"><div className="w-2 h-2 rounded-full bg-slate-400"></div> سليم</div>
        <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg border border-red-100 text-red-600"><div className="w-2 h-2 rounded-full bg-red-500"></div> تسوس</div>
        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-500"></div> حشوة</div>
        <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100 text-purple-600"><div className="w-2 h-2 rounded-full bg-purple-500"></div> عصب</div>
        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 text-amber-600"><div className="w-2 h-2 rounded-full bg-amber-500"></div> تاج</div>
      </div>

      {/* Tooth Detail Modal / Popover */}
      {selectedToothId && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-2xl w-full max-w-xs overflow-hidden ring-1 ring-slate-100 animate-scale-up">
            {/* Modal Header */}
            <div className="bg-slate-50 p-3 flex justify-between items-center border-b border-slate-100">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{selectedToothId}</span>
                تعديل حالة السن
              </h4>
              <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full p-1 transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <p className="text-xs text-slate-500 mb-3 font-bold">اختر الحالة:</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <StatusButton status={status} current="Healthy" onClick={setStatus} label="سليم" color="slate" icon={Shield} />
                <StatusButton status={status} current="Decay" onClick={setStatus} label="تسوس" color="red" icon={AlertCircle} />
                <StatusButton status={status} current="Filled" onClick={setStatus} label="حشوة" color="blue" icon={Activity} />
                <StatusButton status={status} current="RootCanal" onClick={setStatus} label="عصب" color="purple" icon={Zap} />
                <StatusButton status={status} current="Crown" onClick={setStatus} label="تاج" color="amber" icon={Crown} />
              </div>

              {/* Dynamic Fields */}
              {status === 'Crown' && (
                <div className="bg-amber-50 p-3 rounded-xl mb-4 border border-amber-100 space-y-2 animate-fade-in">
                   <div>
                      <label className="text-[10px] font-bold text-amber-700 block mb-1">المادة</label>
                      <div className="flex gap-1">
                         {['Zirconia', 'E-max', 'PFM'].map(m => (
                            <button key={m} onClick={() => updateDetail('material', m)} className={`flex-1 py-1.5 rounded-lg text-[10px] border transition-all ${details.material === m ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-100'}`}>{m}</button>
                         ))}
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-amber-700 block mb-1">اللون (Shade)</label>
                      <input type="text" value={details.shade || ''} onChange={(e) => updateDetail('shade', e.target.value)} className="w-full p-2 rounded-lg border border-amber-200 text-xs outline-none focus:ring-1 focus:ring-amber-400" placeholder="e.g. A2"/>
                   </div>
                </div>
              )}

              {status === 'RootCanal' && (
                <div className="bg-purple-50 p-3 rounded-xl mb-4 border border-purple-100 space-y-2 animate-fade-in">
                   <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-purple-700 block mb-1">عدد القنوات</label>
                        <select value={details.canals || '1'} onChange={(e) => updateDetail('canals', e.target.value)} className="w-full p-1.5 rounded-lg border border-purple-200 text-xs outline-none bg-white">
                           <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-purple-700 block mb-1">الطول (mm)</label>
                        <input type="number" value={details.length || ''} onChange={(e) => updateDetail('length', e.target.value)} className="w-full p-1.5 rounded-lg border border-purple-200 text-xs outline-none focus:ring-1 focus:ring-purple-400" placeholder="21"/>
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-purple-700 block mb-1">نوع المبرد (File)</label>
                      <div className="flex gap-1">
                         {['Rotary', 'Hand'].map(f => (
                            <button key={f} onClick={() => updateDetail('fileType', f)} className={`flex-1 py-1.5 rounded-lg text-[10px] border transition-all ${details.fileType === f ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-100'}`}>{f}</button>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              <p className="text-xs text-slate-500 mb-2 font-bold">تذكير متابعة:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                 {['', '1 week', '2 weeks', '1 month', '6 months'].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setReminder(dur)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${reminder === dur ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                    >
                       {dur === '' ? 'بدون' : dur}
                    </button>
                 ))}
              </div>

              <p className="text-xs text-slate-500 mb-2 font-bold">ملاحظات الطبيب:</p>
              <div className="relative mb-4">
                 <textarea 
                   value={notes}
                   onChange={(e) => setNotes(e.target.value)}
                   placeholder="أكتب تشخيصك هنا..."
                   className="w-full p-3 pl-3 pr-9 bg-slate-50 rounded-xl text-xs border-none outline-none focus:ring-2 focus:ring-indigo-100 resize-none h-20 text-slate-700 placeholder:text-slate-400"
                 />
                 <FileText size={14} className="absolute top-3 right-3 text-slate-400"/>
              </div>

              <button onClick={handleSave} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 active:scale-95 transform duration-100">
                <Check size={16} /> حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusButton = ({ status, current, onClick, label, color, icon: Icon }: any) => (
  <button 
    onClick={() => onClick(current)}
    className={`p-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 h-16 ${status === current ? `bg-${color}-500 text-white border-${color}-500 shadow-md` : `bg-white text-slate-600 border-slate-200 hover:bg-${color}-50 hover:text-${color}-600`}`}
  >
    <Icon size={18} /> {label}
  </button>
);

const Tooth: React.FC<{ id: number; onClick: () => void; isSelected: boolean; data?: { status: string; reminder?: string } }> = ({ id, onClick, isSelected, data }) => {
  const status = data?.status || 'Healthy';
  const hasReminder = !!data?.reminder;
  
  // Define visual styles based on status
  let statusColor = 'bg-white border-slate-200';
  let indicatorColor = 'opacity-0';

  // Override colors if selected to maintain focus, otherwise show status
  if (isSelected) {
      statusColor = 'bg-indigo-100 border-indigo-400 shadow-md shadow-indigo-100';
  } else {
      switch (status) {
          case 'Decay':
              statusColor = 'bg-red-50 border-red-200';
              indicatorColor = 'bg-red-500 opacity-100';
              break;
          case 'Filled':
              statusColor = 'bg-blue-50 border-blue-200';
              indicatorColor = 'bg-blue-500 opacity-100';
              break;
          case 'Crown':
              statusColor = 'bg-amber-50 border-amber-200';
              indicatorColor = 'bg-amber-500 opacity-100';
              break;
          case 'RootCanal':
              statusColor = 'bg-purple-50 border-purple-200';
              indicatorColor = 'bg-purple-500 opacity-100';
              break;
          default:
              statusColor = 'bg-white border-slate-200 group-hover:border-indigo-200';
              break;
      }
  }

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center group transition-all duration-200 p-1 rounded-xl ${isSelected ? 'bg-indigo-50 -translate-y-1' : 'hover:bg-slate-50'}`}
    >
      <div className={`w-9 h-12 border rounded-t-xl rounded-b-lg mb-1 shadow-sm transition-all relative overflow-hidden ${statusColor}`}>
        {/* Visual representation of a tooth root/crown split */}
        <div className={`w-full h-[55%] border-b border-slate-100/50 bg-gradient-to-b from-white to-slate-50/50`}></div>
        
        {/* Reminder Indicator */}
        {hasReminder && (
           <div className="absolute top-0.5 right-0.5 z-10 bg-white/80 rounded-full p-0.5 shadow-sm">
              <Clock size={8} className="text-amber-600" />
           </div>
        )}
        
        {/* Hover effect */}
        {!isSelected && <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-indigo-500 transition-opacity"></div>}

        {/* Status Indicator Icon/Dot */}
        <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all ${indicatorColor}`}></div>
      </div>
      <span className={`text-[10px] font-medium transition-colors ${isSelected ? 'text-indigo-600 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>{id}</span>
    </button>
  );
};

export default DentalChart;