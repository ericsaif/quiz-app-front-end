// app/(admin)/layout.js
import AdminSidebar from './components/AdminSidebar';
import AdminFooter from './components/AdminFooter'; 
import React from 'react';

export default function AdminLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <React.Fragment key={`admin-layout-fragment`}>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-3 border border-gray'>
                <AdminSidebar />
              </div>
              <main className='col border border-gray flex-grow' style={{ flexGrow: 1 }}>{children}</main>
            </div>
            <div className='row'>
              <AdminFooter />
            </div>
          </div>
        </React.Fragment>
  );
}