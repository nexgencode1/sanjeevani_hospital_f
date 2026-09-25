import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  Users, CalendarCheck, MessageSquare, ShieldCheck, 
  Clock, AlertCircle, CheckCircle2, ChevronRight, Activity, Droplets, ArrowUpRight 
} from 'lucide-react';

export default function DashboardOverview({ onSwitchTab }) {
  const { doctors, appointments, inquiries, settings } = useHospital();

  const pendingAppointments = appointments.filter((a) => a.status === 'Pending');
  const confirmedAppointments = appointments.filter((a) => a.status === 'Confirmed');
  const newInquiries = inquiries.filter((i) => i.status === 'New');

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 relative z-10">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Hospital Management Control
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome, Administrator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {settings?.hospitalName || "Sanjeevani Multispeciality Hospital"} • {settings?.registrationNo || "CMO Reg 2013/108"}
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={() => onSwitchTab('appointments')}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Manage Appointments</span>
          </button>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Appointments */}
        <div 
          onClick={() => onSwitchTab('appointments')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-sky-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              View <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">{appointments.length}</span>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Total Appointments</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-600 font-semibold">
            <span>Pending Action:</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">{pendingAppointments.length}</span>
          </div>
        </div>

        {/* Active Doctors */}
        <div 
          onClick={() => onSwitchTab('doctors')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Manage <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">{doctors.length}</span>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Specialist Doctors</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
            <span>Specialities:</span>
            <span>Gynae, Ortho, Surgery+</span>
          </div>
        </div>

        {/* Blood Bank Enquiry */}
        <div 
          onClick={() => onSwitchTab('inquiries')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-rose-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Enquiries <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">{inquiries.length}</span>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Blood Bank Enquiry</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-rose-600 font-semibold">
            <span>New Unread:</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">{newInquiries.length}</span>
          </div>
        </div>

        {/* Emergency Blood Bank Status */}
        <div 
          onClick={() => onSwitchTab('settings')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-sky-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Settings <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">24x7</span>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Blood Bank & Trauma</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span>Helpline:</span>
            <span className="font-bold text-rose-600">{settings?.primaryPhone || '9455304235'}</span>
          </div>
        </div>

      </div>

      {/* Two Columns: Recent Pending Appointments & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Appointments */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Recent Patient Appointments</h3>
              <p className="text-xs text-slate-500">Live requests from website booking form</p>
            </div>
            <button
              onClick={() => onSwitchTab('appointments')}
              className="text-xs font-bold text-sky-600 hover:text-sky-700"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 4).map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{apt.patientName}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-sky-100 text-sky-700">
                      {apt.id}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    {apt.doctorName} • {apt.date} ({apt.timeSlot})
                  </p>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      apt.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : apt.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact & Blood Bank Inquiries */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Recent Blood Bank Enquiries</h3>
              <p className="text-xs text-slate-500">Messages & urgent blood requests received</p>
            </div>
            <button
              onClick={() => onSwitchTab('inquiries')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{inq.name}</span>
                  <span className="text-[10px] text-slate-400">+91 {inq.phone}</span>
                </div>
                <p className="text-[11px] font-semibold text-sky-700">{inq.subject || 'General Inquiry'}</p>
                <p className="text-[11px] text-slate-600 line-clamp-2">{inq.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
