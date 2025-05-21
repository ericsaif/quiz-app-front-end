"use client"

import Link from "next/link"
import React from "react"

import "./finish.css"

const TestFinishInner = () =>{

    return (
        <React.Fragment>
            <div className="finish-container container-fluid text-center">
                <div className="row">
                    <h3>
                        УРА!
                    </h3>
                    <p>
                        Вы прошли тест 
                    </p>
                    <p>
                        Результаты и сертификат сгенерируются на странице - Мои результаты
                    </p>
                </div>
                <div className="row">
                    <div>
                        <Link className="page-button btn" href={`/user/results`}>
                            Мои результаты
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TestFinishInner