import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  CalendarCheck, Search, Filter, Phone, MessageSquare, 
  Trash2, CheckCircle, Clock, XCircle, AlertCircle, RefreshCw 
} from 'lucide-react';

export default function AppointmentsManager() {
  const { appointments, updateAppointmentStatus, deleteAppointment, settings } = useHospital();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const statuses = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === 'All' || apt.status === filterStatus;
    const matchesSearch = apt.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.phone?.includes(searchQuery) ||
                          apt.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id);
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete appointment record for ${name} (${id})?`)) {
      try {
        await deleteAppointment(id);
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  const getWhatsAppReminderUrl = (apt) => {
    const text = encodeURIComponent(
      `Hello ${apt.patientName}, your appointment at Sanjeevani Hospital (Kaushambi) with ${apt.doctorName} is confirmed for ${apt.date} at ${apt.timeSlot}. Token ID: ${apt.id}. Hospital Helpline: +91 ${settings?.primaryPhone || '9455304235'}.`
    );
    return `https://wa.me/91${apt.phone}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900">Patient Appointments & Booking Requests</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming doctor consultation requests, confirm slots, and send WhatsApp reminders.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            Pending: {appointments.filter((a) => a.status === 'Pending').length}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Confirmed: {appointments.filter((a) => a.status === 'Confirmed').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, token, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-sky-500 font-medium"
          />
        </div>
      </div>

      {/* Appointments Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No appointment records found for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Token / Patient</th>
                  <th className="p-4">Doctor & Department</th>
                  <th className="p-4">Date & Slot</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-sky-700 text-xs">{apt.id}</span>
                        <p className="font-bold text-slate-900 text-sm">{apt.patientName}</p>
                        <p className="text-[11px] text-slate-400">
                          {apt.gender || 'Patient'} {apt.age ? `• ${apt.age} yrs` : ''}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800">{apt.doctorName}</p>
                        <p className="text-[11px] text-slate-500">{apt.department}</p>
                        {apt.symptoms && (
                          <p className="text-[10px] text-slate-400 italic line-clamp-1 max-w-xs">
                            "{apt.symptoms}"
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800">{apt.date}</p>
                        <p className="text-emerald-700 font-semibold text-[11px]">{apt.timeSlot}</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800">+91 {apt.phone}</p>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${apt.phone}`}
                            className="p-1 rounded bg-slate-100 hover:bg-sky-50 text-sky-600 transition-colors"
                            title="Call Patient"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={getWhatsAppReminderUrl(apt)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                            title="Send WhatsApp Confirmation"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <select
                        value={apt.status}
                        disabled={actionLoading === apt.id}
                        onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                        className={`font-bold text-[11px] px-2.5 py-1 rounded-xl border focus:outline-none ${
                          apt.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : apt.status === 'Pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : apt.status === 'Completed'
                            ? 'bg-sky-50 text-sky-800 border-sky-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(apt.id, apt.patientName)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
