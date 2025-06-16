import HighLightEx from "./HighLightEx/HighLightEx"
import MiniEex1 from "./MiniE1"
import MiniEx2 from "./MiniE2/MiniE2"
import MiniE_5_6 from "./MiniE_5_6/MiniE_5_6"

const getExercise = (currentEx: number) =>{
    switch(currentEx){
            case 0: return <MiniEex1  />
            case 1: return <MiniEx2 />
            case 2: return <HighLightEx />
            case 3: return <HighLightEx />
            case 4: return <MiniE_5_6 />
            case 5: return <MiniE_5_6 />
        }
}

export default getExercise