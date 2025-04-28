// app/(user)/layout.js
import UserSideBar from './components/UserSideBar';
import UserFooter from './components/UserFooter';
import React from 'react';

const UserLayout =  ({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) =>{
  return (
    <React.Fragment key={`user-layout-fragment`}>
      <div className=' container-fluid d-flex vstack mt-3' style={{height: '100vh'}}>
        <div className='row h-100 ' >
          <div className="col-3 border border-gray-25 ms-0 p-2" >
            <UserSideBar />
          </div>
          <main className='col d-flex '>{children}</main>
        </div>
     
      </div>
      <UserFooter />
    </React.Fragment>
  );
}

export default UserLayout