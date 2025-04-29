import Image from "next/image"
import Link from "next/link"
import React from "react"

const FailPage = ()=>{
    return (
        <React.Fragment key={`fail-page-fragment`}>
            <div className="container-fluid vstack">
                <h2 className="text-center text-danger align-self-center">
                    Ошибка
                </h2>
                <Image
                    className="align-self-center"
                    src={`/reshot-icon-fail.svg`} width={150} height={150} alt="error"/>

                <p className="align-self-center fs-5" >
                    Не получилось произвести оплату, <Link href={`/user/buy`}>попробуйте еще раз</Link>
                </p>

            </div>
        </React.Fragment>
    )
}

export default FailPage