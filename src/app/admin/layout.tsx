// app/(admin)/layout.js
import { LayoutProvider } from "./contexts/LayoutContext";
import Layout from "./layouts/AdminLayout";

export default function AdminLayout({ 
    children 
  }: Readonly<{
    children: React.ReactNode
}>) {
  return (
    <LayoutProvider>
        <Layout >
          {children}
        </Layout>
    </LayoutProvider>
  );
}