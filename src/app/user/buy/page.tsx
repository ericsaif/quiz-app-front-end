"use client"

import React, { useState } from "react"
import { BACKEND_BASE_URL } from "../../../../constants/api"
import { useRouter } from "next/navigation"
import { Input } from "@headlessui/react"
import Image from "next/image"

const BuyTests = ()=>{
    const [numTests, setnumTests] = useState<number>(1)
    const router = useRouter()

    const PostBuy = async ()=> {
        const response = await fetch(`${BACKEND_BASE_URL}/api/user/purchase`,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({numTests})
        })
        if(response.redirected){
            router.push(response.url)
        }
    }
    const HandleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { value } = event.target
        setnumTests( parseInt(value, 10))
    }
    const HandleSubmit = (event: React.ChangeEvent<HTMLFormElement>) =>{
        event.preventDefault()
        PostBuy()
    }
    return (
        <React.Fragment>
            <div className="container-fluid">
                <h1 className="row">
                    КУПИТЬ ТЕСТЫ
                </h1>
                <form className="row vstack" onSubmit={HandleSubmit}>
                    <div className="col d-flex justify-content-center border border-gray">
                        <label htmlFor="selectNumTests1">
                            <Input type="radio" value={1} checked={numTests === 1} onChange={HandleOptionsChange} name="selectNumTests" id="selectNumTests1"/>
                            <Image alt="1 test" src={`/exam-vectorportal.svg`} width={300} height={400}/>
                        </label>
                    </div>
                    <div className="col d-flex justify-content-center border border-gray">
                        <label htmlFor="selectNumTests2">
                        <Input type="radio" value={2} checked={numTests === 2} onChange={HandleOptionsChange} name="selectNumTests" id="selectNumTests2"/>
                            <Image alt="1 test" src={`/exam-vectorportal.svg`} width={300} height={400}/>
                        </label>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default BuyTests