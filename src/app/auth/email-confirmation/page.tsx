"use client"

import React, { Suspense, useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import { useSearchParams, useRouter } from "next/navigation";
import { UserStatus } from "../Models/UserStatus";


const EmailConfirmInner = () =>{
    const [error, seterror] = useState<string | null>(null)
    const [success, setsuccess] = useState<string | null>(null)
    const [loading, setloading] = useState<boolean>(true)

    const searchParams = useSearchParams();
    const router = useRouter();


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

    useEffect(() => {
        const confirmEmail = async () => {
            try {

                const callbackUrl = searchParams.get('callbackUrl');

                // Retrieve the 'userId' and 'code' parameters
                const userId = searchParams.get('userId');
                const code = searchParams.get('code');

                // Make the POST request
                const response = await fetch(`${BACKEND_BASE_URL}/api/auth/confirmemail`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, code }),
                });

                if (response.ok) {
                    console.log('Email confirmed successfully');

                    setsuccess("Ваш email успешно подтвержден")

                    let effectiveRole =  'guest';

                    const contentType = response.headers.get("content-type") || "";
                    if (contentType.includes("application/json")) {
                        const userData: UserStatus = await response.json();
                        
                        effectiveRole = userData.userRole

                    }else{
                        effectiveRole = getCookie('userRole') || 'guest'
                    }

                    if(callbackUrl)
                        router.push(callbackUrl)
                    else
                        router.push(`/${effectiveRole}/dashboard`);

                } else {
                    console.error('Failed to confirm email');
                    seterror("Ошибка при подвтерждении вашего email")
                }
            } catch (err) {
                console.error('Error confirming email:', err);
                seterror("Ошибка при подвтерждении вашего email")

            }finally{
                setloading(false)
            }
        };

        confirmEmail();
    }, [router, searchParams]);

    return (
        <React.Fragment key={`React-register-fragment`}>
           <div>
                {loading && <p><i>Loading ... </i></p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
           </div>
        </React.Fragment>
    )
}

const EmailConfirm = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <EmailConfirmInner />
    </Suspense>
);

export default EmailConfirm