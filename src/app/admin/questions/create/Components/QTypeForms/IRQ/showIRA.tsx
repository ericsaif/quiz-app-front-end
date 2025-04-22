import React from "react"

const ShowIRA = (props:{
    setcorrectOptionsMiniE1: React.Dispatch<React.SetStateAction<number[]>>
    setcorrectOptionMiniE2: React.Dispatch<React.SetStateAction<number>>
    setcorrectHighlightMiniE3: React.Dispatch<React.SetStateAction<string>>
    setcorrectHighlightMiniE4: React.Dispatch<React.SetStateAction<string>>
    setcorrectOptionMiniE5: React.Dispatch<React.SetStateAction<number>>
    setcorrectOptionMiniE6: React.Dispatch<React.SetStateAction<number>>
}) =>{
    const {
        setcorrectOptionsMiniE1,
        setcorrectOptionMiniE2,
        setcorrectHighlightMiniE3,
        setcorrectHighlightMiniE4,
        setcorrectOptionMiniE5,
        setcorrectOptionMiniE6,
    } = props

    const HandleCorrectMiniE1Change = (value: string, index: number) =>{
        setcorrectOptionsMiniE1(prevOptions =>{
            const newOptions = [...prevOptions]
            newOptions[index] = parseInt(value, 10)
            return newOptions
        })
    }
    const HandleCorrectMiniE2Change = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const { value } = event.target
        setcorrectOptionMiniE2(parseInt(value, 10))
    }

    const HandleCorrectMiniE3InputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const { value } = event.target
        setcorrectHighlightMiniE3(value)
    }
    
    const HandleCorrectMiniE4InputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const { value } = event.target
        setcorrectHighlightMiniE4(value)    
    }
    const HandleCorrectOptionsMiniE5Change = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const { value } = event.target
        setcorrectOptionMiniE5(parseInt(value, 10))
    } 
    const HandleCorrectOptionsMiniE6Change = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const { value } = event.target
        setcorrectOptionMiniE6(parseInt(value, 10))
    }

    

    const ShowCorrectOptionsMiniE1 = () =>{
        const inputs:React.ReactNode[] = []
        for(let i =0; i<10; i++){
            const options: React.ReactNode[]=[]
            for(let j =i *5; j<(i*5)+5; j++){
                options.push(
                    <option key={`option-MiniE1-${j}`} value={j}>
                        Опция: {j+1}
                    </option>
                )
            }
            inputs.push(
                <React.Fragment key={`selectCorrectOptions-MiniE1-${i}`}>
                    <label htmlFor={`selectCorrectOptions-MiniE1-${i}`}>Выберите номер правильного ответа для вопроса номер: {i+1}</label>
                    <select name={`selectCorrectOptions-MiniE1-${i}`} id={`selectCorrectOptions-MiniE1-${i}`} onChange={(e)=>HandleCorrectMiniE1Change(e.target.value,i)}>
                        {options}
                    </select>
                </React.Fragment>
            )
        }
        return (
            <div className="vstack">
                {inputs}
            </div>
        )
    }

    const ShowCorrectOptionsMiniE2 = () =>{
        const inputs:React.ReactNode[] = []
        const options:React.ReactNode[] = []
            for(let j =0; j<5; j++){
                options.push(
                    <option key={`option-MiniE2-${j}`} value={j}>
                        Опция: {j+1}
                    </option>
                )
            }
            inputs.push(
                <React.Fragment key={`selectCorrectOptions-MiniE2-react-fragment`}>
                    <select name={`selectCorrectOptions-MiniE2}`} id={`selectCorrectOptions-MiniE2}`} onChange={HandleCorrectMiniE2Change}>
                        {options}
                    </select>
                </React.Fragment>
            )
        return inputs
    }
    const ShowCorrectOptionsMiniE5 = () =>{
        const inputs:React.ReactNode[] = []
        const options:React.ReactNode[] = []
            for(let j =0; j<5; j++){
                options.push(
                    <option key={`option-MiniE5-${j}`} value={j}>
                        Опция: {j+1}
                    </option>
                )
            }
            inputs.push(
                <React.Fragment key={`selectCorrectOptions-MiniE5-react-fragment`}>
                    <select name={`selectCorrectOptions-MiniE5}`} id={`selectCorrectOptions-MiniE5}`} onChange={HandleCorrectOptionsMiniE5Change}>
                        {options}
                    </select>
                </React.Fragment>
            )
        return inputs
    }
    const ShowCorrectOptionsMiniE6 = () =>{
        const inputs:React.ReactNode[] = []
        const options:React.ReactNode[] = []
            for(let j =0; j<5; j++){
                options.push(
                    <option key={`option-MiniE6-${j}`} value={j}>
                        Опция: {j+1}
                    </option>
                )
            }
            inputs.push(
                <React.Fragment key={`selectCorrectOptions-MiniE6}`}>
                    <select name={`selectCorrectOptions-MiniE6}`} id={`selectCorrectOptions-MiniE6}`} onChange={HandleCorrectOptionsMiniE6Change}>
                        {options}
                    </select>
                </React.Fragment>
            )
        return inputs
    }
    return(
        <div className="container" id="Create-IRAnswer-Container" key={`ShowIRA-React-Fragment`}>
                <label htmlFor="CorrectOptionsMiniE1"> Mini Excercise No: 1</label>
                <div className="row">
                    <div className="q-container col-6" id="CorrectOptionsMiniE1">
                        {ShowCorrectOptionsMiniE1()}
                    </div>

                    <div className="col-6">
                        <label  htmlFor="CorrectOptionsMiniE2"> Выберите номер правильного ответа для Mini Exercise No: 2 </label>
                        <div id="CorrectOptionsMiniE2">
                            {ShowCorrectOptionsMiniE2()}
                        </div>
                        <div className="vstack">
                            <label htmlFor="CorrectOptionsMiniE3"> Правильный Highlight Mini Exercise No: 3 </label>
                            <textarea id="CorrectOptionsMiniE3" onChange={HandleCorrectMiniE3InputChange}></textarea> 
                        </div>
                        <div className="vstack">
                            <label htmlFor="CorrectOptionsMiniE4">Правильный Highlight Mini Exercise No: 4</label>
                            <textarea id="CorrectOptionsMiniE4" onChange={HandleCorrectMiniE4InputChange}></textarea> 
                        </div>

                        <label htmlFor="CorrectOptionsMiniE5">  Выберите номер правильного ответа для Mini Exercise No: 5 </label>
                        <div id="CorrectOptionsMiniE5">
                            {ShowCorrectOptionsMiniE5()}
                        </div>

                        <label htmlFor="CorrectOptionsMiniE6">  Выберите номер правильного ответа для Mini Exercise No: 6 </label>
                        <div id="CorrectOptionsMiniE6">
                            {ShowCorrectOptionsMiniE6()}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ShowIRA