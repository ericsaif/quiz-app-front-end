import { Dispatch, SetStateAction } from "react";
import * as QTYPES from '../../../../../Components/QTypeForms/index'

const getQForm = (QType: number, setTitle: Dispatch<SetStateAction<string>>) =>{
    switch(QType){
        case 1: setTitle("CTest"); return <QTYPES.CTest QPOId={1}/>;
        case 2: setTitle("Dictation"); return <QTYPES.Dictation QPOId={2}/>;
        case 3: setTitle("Read Aloud"); return <QTYPES.RA QPOId={3} /> ;
        case 4: setTitle("Describe Picture"); return <QTYPES.DescribePic />;
        case 5: setTitle("Read and complete"); return <QTYPES.RAC QPOId={5} />;
        case 6: setTitle("Read and speak"); return <QTYPES.RS QPOId={6}/>;
        case 7: setTitle("Word Exists"); return <QTYPES.WordExists QPOId={7}/>;
        case 9: setTitle("Listen and speak"); return <QTYPES.LAS QPOId={9}/>;
        case 10: setTitle("Essay"); return <QTYPES.Essay QPOId={11}/>;
        case 11: setTitle("Interactive Reading"); return <QTYPES.IRQ QPOId={12}/>;
        case 12: setTitle("Interactive Listening"); return <QTYPES.ILQ QPOId={13}/>;
        case 13: setTitle("Interview"); return <QTYPES.Interview QPOId={14}/>;
    }
}

export default getQForm