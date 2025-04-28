// app/(admin)/layout.js
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader'; 
import React from 'react';

export default function AdminLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <React.Fragment key={`admin-layout-fragment`}>
          <AdminHeader />
          <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <main style={{ flexGrow: 1 }}>{children}</main>
          </div>
        </React.Fragment>
  );
}