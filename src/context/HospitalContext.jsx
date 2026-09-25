import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const HospitalContext = createContext();

export function HospitalProvider({ children }) {
  const { token, isAuthenticated } = useAuth();

  const [settings, setSettings] = useState({
    hospitalName: 'Sanjeevani Multispeciality Hospital & Trauma Center',
    hospitalTagline: "Kaushambi District's 1st Multispeciality Healthcare & Trauma Center",
    registrationNo: 'CMO Reg. No. 2013/108',
    bloodBankLicense: 'Licence No. BBF28C2026UP000019',
    address: 'Sarai Akil, Kaushambi Road, Kaushambi, Uttar Pradesh - 212216',
    primaryPhone: '9455304235',
    emergencyPhone: '7897284402',
    helplinePhone: '6307821195',
    whatsappNumber: '919455304235',
    email: 'contact@sanjeevanihospital.in',
    emergencyEmail: 'emergency@sanjeevanihospital.in',
    opdTimings: 'Mon - Sat: 08:00 AM - 08:00 PM | Sun: 09:00 AM - 02:00 PM (Free OPD)',
    emergencyTimings: '24x7 Available (Emergency, Trauma, Blood Bank & ICU)',
    headerNotice: 'Free Medical Consultation & OPD Every Sunday | Ayushman Bharat PM-JAY Cashless Treatment Available | 24x7 Emergency & Blood Bank',
    sundayFreeOPD: true,
    ayushmanBharatEnabled: true,
    hausalaSaajhedari: true,
    aboutShort: 'Sanjeevani Multispeciality Hospital & Trauma Center is the first and premier multispeciality hospital in Kaushambi district, providing state-of-the-art medical, surgical, maternity, blood bank, and trauma care services.',
    aboutMission: 'To deliver compassionate, world-class, affordable, and accessible healthcare to the people of Kaushambi and surrounding regions with cutting-edge medical technologies.',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    },
    stats: {
      patientsTreated: '50,000+',
      surgeriesDone: '12,500+',
      bloodUnitsCollected: '8,000+',
      deliveriesConducted: '7,200+',
      experienceYears: '12+'
    }
  });

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Public Data
  const loadPublicData = useCallback(async () => {
    try {
      const [settingsRes, doctorsRes, galleryRes] = await Promise.allSettled([
        api.getSettings(),
        api.getDoctors(),
        api.getGallery()
      ]);

      if (settingsRes.status === 'fulfilled') setSettings(settingsRes.value);
      if (doctorsRes.status === 'fulfilled') setDoctors(doctorsRes.value);
      if (galleryRes.status === 'fulfilled') setGallery(galleryRes.value);
    } catch (err) {
      console.error('Error fetching public hospital data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Admin Protected Data
  const loadAdminData = useCallback(async () => {
    if (!token) return;
    try {
      const [aptRes, inqRes, statsRes] = await Promise.allSettled([
        api.getAppointments(token),
        api.getInquiries(token),
        api.getStats(token)
      ]);

      if (aptRes.status === 'fulfilled') setAppointments(aptRes.value);
      if (inqRes.status === 'fulfilled') setInquiries(inqRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  }, [token]);

  useEffect(() => {
    loadPublicData();
  }, [loadPublicData]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, loadAdminData]);

  // Actions
  const updateSettings = async (newSettings) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.updateSettings(newSettings, token);
    if (res.success) {
      setSettings(res.data);
      return res.data;
    }
    throw new Error('Failed to update settings');
  };

  const addDoctor = async (doctorData) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.addDoctor(doctorData, token);
    if (res.success) {
      setDoctors((prev) => [res.data, ...prev]);
      return res.data;
    }
    throw new Error('Failed to add doctor');
  };

  const updateDoctor = async (id, doctorData) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.updateDoctor(id, doctorData, token);
    if (res.success) {
      setDoctors((prev) => prev.map((d) => (d.id === id ? res.data : d)));
      return res.data;
    }
    throw new Error('Failed to update doctor');
  };

  const deleteDoctor = async (id) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.deleteDoctor(id, token);
    if (res.success) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
      return true;
    }
    throw new Error('Failed to delete doctor');
  };

  const bookAppointment = async (bookingData) => {
    const res = await api.createAppointment(bookingData);
    if (res.success) {
      if (isAuthenticated) {
        setAppointments((prev) => [res.data, ...prev]);
      }
      return res.data;
    }
    throw new Error('Failed to book appointment');
  };

  const updateAppointmentStatus = async (id, status) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.updateAppointmentStatus(id, status, token);
    if (res.success) {
      setAppointments((prev) => prev.map((a) => (a.id === id ? res.data : a)));
      return res.data;
    }
    throw new Error('Failed to update appointment');
  };

  const deleteAppointment = async (id) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.deleteAppointment(id, token);
    if (res.success) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      return true;
    }
    throw new Error('Failed to delete appointment');
  };

  const sendInquiry = async (inquiryData) => {
    const res = await api.createInquiry(inquiryData);
    if (res.success) {
      if (isAuthenticated) {
        setInquiries((prev) => [res.data, ...prev]);
      }
      return res.data;
    }
    throw new Error('Failed to send inquiry');
  };

  const updateInquiryStatus = async (id, status) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.updateInquiryStatus(id, status, token);
    if (res.success) {
      setInquiries((prev) => prev.map((i) => (i.id === id ? res.data : i)));
      return res.data;
    }
    throw new Error('Failed to update inquiry status');
  };

  const addGalleryItem = async (itemData) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.addGalleryItem(itemData, token);
    if (res.success) {
      setGallery((prev) => [res.data, ...prev]);
      return res.data;
    }
    throw new Error('Failed to add gallery item');
  };

  const deleteGalleryItem = async (id) => {
    if (!token) throw new Error('Unauthorized');
    const res = await api.deleteGalleryItem(id, token);
    if (res.success) {
      setGallery((prev) => prev.filter((g) => g.id !== id));
      return true;
    }
    throw new Error('Failed to delete gallery item');
  };

  const uploadImage = async (file) => {
    return await api.uploadImage(file, token);
  };

  return (
    <HospitalContext.Provider
      value={{
        settings,
        doctors,
        appointments,
        inquiries,
        gallery,
        stats,
        loading,
        uploadImage,
        updateSettings,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        bookAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        sendInquiry,
        updateInquiryStatus,
        addGalleryItem,
        deleteGalleryItem,
        refreshPublicData: loadPublicData,
        refreshAdminData: loadAdminData
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export const useHospital = () => useContext(HospitalContext);
