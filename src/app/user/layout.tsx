import { LayoutProvider } from "./contexts/LayoutContext";
import Layout from "./layouts/UserLayout";

const UserLayout =  ({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) =>{
  return (
      <LayoutProvider>
          <Layout >
            {children}
          </Layout>
      </LayoutProvider>
  );
}

export default UserLayout