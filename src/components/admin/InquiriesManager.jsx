import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  Droplets, MessageSquare, Phone, Mail, CheckCircle2, Clock, 
  Search, Check, Trash2, AlertTriangle 
} from 'lucide-react';

export default function InquiriesManager() {
  const { inquiries, updateInquiryStatus, settings } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const isBloodBankInquiry = (inq) => {
    const text = `${inq.subject || ''} ${inq.message || ''}`.toLowerCase();
    return text.includes('blood') || 
           text.includes('platelet') || 
           text.includes('plasma') || 
           text.includes('prbc') || 
           text.includes('ब्लड') || 
           text.includes('रक्त') || 
           text.includes('donor') ||
           text.includes('negative') ||
           text.includes('positive') ||
           text.includes('unit');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    let matchesFilter = true;
    if (filterStatus === 'Blood Bank Only') {
      matchesFilter = isBloodBankInquiry(inq);
    } else if (filterStatus !== 'All') {
      matchesFilter = inq.status === filterStatus;
    }

    const matchesSearch = inq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.phone?.includes(searchQuery) ||
                          inq.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'New' ? 'Responded' : 'New';
    try {
      await updateInquiryStatus(id, nextStatus);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const bloodCount = inquiries.filter(isBloodBankInquiry).length;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Blood Bank Enquiry & Patient Messages</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Blood bank urgent requests, component requirements, and direct patient messages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold flex-wrap">
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            Blood Requests: {bloodCount}
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800">
            Total Messages: {inquiries.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            New: {inquiries.filter((i) => i.status === 'New').length}
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {['All', 'Blood Bank Only', 'New', 'Responded'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? (st === 'Blood Bank Only' ? 'bg-rose-600 text-white shadow-xs' : 'bg-sky-600 text-white shadow-xs')
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'Blood Bank Only' && '🩸 '}{st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inquiry message or sender..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-sky-500 font-medium"
          />
        </div>
      </div>

      {/* Inquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInquiries.length === 0 ? (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center text-slate-400 text-xs border border-slate-200">
            No inquiries matching your criteria.
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">{inq.name}</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {isBloodBankInquiry(inq) && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-rose-600" />
                        Blood Bank
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        inq.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <a href={`tel:${inq.phone}`} className="hover:text-sky-600 font-bold text-slate-800 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    +91 {inq.phone}
                  </a>
                  {inq.email && (
                    <a href={`mailto:${inq.email}`} className="hover:text-sky-600 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {inq.email}
                    </a>
                  )}
                </div>

                {inq.subject && (
                  <p className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg inline-block">
                    Subject: {inq.subject}
                  </p>
                )}

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {inq.message}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">
                  {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(inq.id, inq.status)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{inq.status === 'New' ? 'Mark Responded' : 'Mark New'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
