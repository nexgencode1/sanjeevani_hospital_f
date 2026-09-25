import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardOverview from '../../components/admin/DashboardOverview';
import SiteSettingsManager from '../../components/admin/SiteSettingsManager';
import DoctorsManager from '../../components/admin/DoctorsManager';
import AppointmentsManager from '../../components/admin/AppointmentsManager';
import InquiriesManager from '../../components/admin/InquiriesManager';
import GalleryManager from '../../components/admin/GalleryManager';
import HeroSliderManager from '../../components/admin/HeroSliderManager';

export default function AdminDashboardPage({ onBackToSite }) {
  const [adminTab, setAdminTab] = useState('overview');

  return (
    <AdminLayout activeTab={adminTab} onSelectTab={setAdminTab} onBackToSite={onBackToSite}>
      {adminTab === 'overview' && <DashboardOverview onSwitchTab={setAdminTab} />}
      {adminTab === 'slider' && <HeroSliderManager />}
      {adminTab === 'settings' && <SiteSettingsManager />}
      {adminTab === 'doctors' && <DoctorsManager />}
      {adminTab === 'appointments' && <AppointmentsManager />}
      {adminTab === 'inquiries' && <InquiriesManager />}
      {adminTab === 'gallery' && <GalleryManager />}
    </AdminLayout>
  );
}
