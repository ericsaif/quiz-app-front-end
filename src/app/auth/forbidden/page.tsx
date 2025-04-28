import Link from "next/link"

const ForbiddenPage = () =>{
    return(
        <div className="d-flex align-items-center" style={{height:"100vh"}}>
            <div className="m-auto">
                <h1 >
                    У вас нет доступа к данному ресурсу...
                </h1>
                <p>
                    Нажмите на одну из кнопок ниже, чтобы вернуться на страницу Домой или Личная Панель Управления
                </p>
                <div className="d-grid gap-2">
                    <Link className="btn btn-primary" href="/">
                        Домой
                    </Link>
                    <Link className="btn btn-secondary" href="/user/dashboard">
                        Панель управления
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForbiddenPage