import { cookies } from 'next/headers'

import Link from "next/link"

const NotFound = async () =>{

  const userRole = (await cookies()).get('userRole')?.value || 'guest'

  return (
      <main id="page-404" className="d-flex justify-content-center vstack" style={{ height: "100vh" }}>
          <div id="text-404" >
              <h1 className="">
                  Страница не существует
              </h1>
              <p className="">Вернуться в <Link href={`/${userRole}/dashboard`}> Панель Управления</Link></p>
          </div>
      </main>
  )
}

export default NotFound