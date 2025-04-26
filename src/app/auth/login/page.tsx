"use client";

import React, { Suspense } from 'react';
import LoginPage from './loginPage'; // Your actual component

const AuthLogin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default AuthLogin;