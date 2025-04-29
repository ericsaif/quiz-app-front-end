import Image from "next/image"
import React from "react"
import Link from "next/link"


const SuccesPage = ()=>{
    return (
        <React.Fragment key={`success-page-fragment`}>
            <div className="container-fluid vstack">
                <h1 className="text-center text-success align-self-center">
                    Ура!!!
                </h1>
                <Image className="align-self-center" src={`/reshot-icon-success.svg`} alt="success-icon" width={200} height={200}/>
                <p className="align-self-center fs-5" >
                    Опалата прошла успешно - <Link href={`/user/myTests`}>перейти к тестам</Link>
                </p>
            </div>
        </React.Fragment>

    )
}

export default SuccesPage