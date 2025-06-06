// pages/login.tsx (Pages Router) or app/login/page.tsx (App Router) - Simplified example
"use client"; // If using App Router and client-side logic

import { useState } from 'react';
import { Button } from '@headlessui/react';

import { BACKEND_BASE_URL } from '../../../../constants/api';

const RegisterPage =() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setrememberMe] = useState<boolean>(false);

  const [error, setError] = useState<string | null>("");
  

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setError(null);

    try {
      // Make the API call to your ASP.NET Core backend login endpoint
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (response.ok) {
        

      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="d-flex align-items-center" style={{minHeight: "100vh"}}>
      <div className='container auth-container w-50' >
        <h1>Register</h1>
        <form className='container-fluid d-flex vstack' onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='vstack'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='youremail@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='vstack'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder='yourpassword'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div >
            <label className='mx-1' htmlFor="rememberMe">Remember Me:</label>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              placeholder=''
              onChange={(e) => setrememberMe(e.target.checked)}
              // required
            />
          </div>
          <Button className={`btn btn-primary align-self-center w-100 my-2`} type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage