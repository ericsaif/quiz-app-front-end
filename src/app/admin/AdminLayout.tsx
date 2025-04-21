// app/(admin)/layout.js
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader'; 

export default function AdminLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AdminHeader />
        <div style={{ display: 'flex' }}>
          <AdminSidebar />
          <main style={{ flexGrow: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}