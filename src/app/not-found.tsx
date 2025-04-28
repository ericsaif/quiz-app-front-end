import Image from "next/image"
import Link from "next/link"

const NotFound = () =>{
    return (
        <main className="d-flex align-items-center vstack" style={{ height: "100vh" }}>
            <Image src={`/browser-error-404-icon.svg`} width={200} height={300} alt="404"/>
            <div className="mx-auto">
                <h1 className="mx-auto">
                    Данная Страница не существует
                </h1>
                <p className="mx-auto">Вернуться в <Link href={`/user/dashboard`}> Панель Управления</Link></p>
            </div>
        </main>
    )
}

export default NotFound