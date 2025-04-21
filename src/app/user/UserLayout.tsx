// app/(user)/layout.js
import UserSideBar from './components/UserSideBar';
import UserFooter from './components/UserFooter';

export default function UserLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <UserSideBar />
        <main>{children}</main>
        <UserFooter />
      </body>
    </html>
  );
}