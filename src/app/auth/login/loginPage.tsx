// pages/login.tsx (Pages Router) or app/login/page.tsx (App Router) - Simplified example
"use client"; // If using App Router and client-side logic

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@headlessui/react';

import { BACKEND_BASE_URL } from '../../../../constants/api';
import { UserStatus } from '../Models/UserStatus';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setrememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [userRole, setuserRole] = useState<string | undefined>("guest")

  const router = useRouter();
  const searchParams = useSearchParams();

  function getCookie(name: string): string | undefined {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, ...valParts] = cookie.trim().split('=');
      if (key === name) {
        return decodeURIComponent(valParts.join('='));
      }
    }
    return undefined;
  }
  
  const callbackUrl = searchParams.get('callbackUrl');


  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setError(null);

    try {
      // Make the API call to your ASP.NET Core backend login endpoint
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (response.ok) {
        let effectiveRole = getCookie('userRole') || 'guest';
        // Check if response has content
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const userData: UserStatus = await response.json();
          
          effectiveRole = userData.userRole

          setuserRole ( userData.userRole || userRole);
        }


        if(callbackUrl){
          router.push(callbackUrl)
        }else
          router.push(`/${effectiveRole}/dashboard`); 

      } else {
        // const errorData = await response.text();
        setError(await response.text() || 'Ошибка при попытке войти в аккаунт.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ошибка при попытке войти в аккаунт');
    }
  };

  return (
    <div className="d-flex align-items-center" style={{minHeight: "100vh"}}>
      <div className='container auth-container w-50' >
        <h1>Login</h1>
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