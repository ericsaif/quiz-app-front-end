"use client"

import React, { useState } from "react"
import { BACKEND_BASE_URL } from "../../../../constants/api"
import { useRouter } from "next/navigation"
import { Button, Input } from "@headlessui/react"
import Image from "next/image"

const BuyTests = ()=>{
    const [numTests, setnumTests] = useState<number>(2)
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
            <div className="container-fluid" >
                <h1 className="row">
                    КУПИТЬ ТЕСТЫ
                </h1>
                <form className="form-check vstack d-grid custom-radio " onSubmit={HandleSubmit}>
                        <p className={`best-price text-center ${numTests === 2 ? 'best-price-checked' : ''}`}>
                            Лучшая цена
                        </p>
                        <label className='test-option' htmlFor="selectNumTests2" >
                            <Input className='form-check-input' type="radio" value={2} checked={numTests === 2} onChange={HandleOptionsChange} name="selectNumTests" id="selectNumTests2"/>
                            
                            <div className="hstack justify-content-start">
                                <div className="buy-test-image">
                                    <Image fill alt="1 test" src={`/reshot-icon-exam.svg`} />
                                </div>
                                <div className="buy-test-image">
                                    <Image fill alt="1 test" src={`/reshot-icon-exam.svg`} />                                
                                </div>
                            </div>
                            <p className="buy-tests-text">
                                2 Теста - каждый по Х тг
                            </p>
                            <span className="checkmark"></span>
                        </label>

                        <label className='test-option' htmlFor="selectNumTests1">
                            <Input className='form-check-input' type="radio" value={1} checked={numTests === 1} onChange={HandleOptionsChange} name="selectNumTests" id="selectNumTests1"/>
                            <div className="buy-test-image">
                                <Image fill alt="1 test" src={`/reshot-icon-exam.svg`}/>
                            </div>
                            <span className="checkmark"></span>
                            <p className="buy-tests-text">
                                1 Тест - каждый по Х тг
                            </p>
                        </label>
                    <Button type="submit" className={`btn btn-primary `}>КУПИТЬ</Button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default BuyTests