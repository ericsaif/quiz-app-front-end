import { Dispatch, SetStateAction } from "react";
import { IRQ } from "../commonImports";

export interface IRQ_C {
    question: IRQ,
    handleSubmit: () => void,
    setNext: React.Dispatch<React.SetStateAction<number>>,
    userOptionsMiniE1: number[];
    setuserOptionsMiniE1: Dispatch<SetStateAction<number[]>>;
    userOptionMiniE2: number;
    setuserOptionMiniE2: Dispatch<SetStateAction<number>>;
    userHighlightMiniE3: string;
    setuserHighlightMiniE3: Dispatch<SetStateAction<string>>;
    userHighlightMiniE4: string;
    setuserHighlightMiniE4: Dispatch<SetStateAction<string>>;
    userOptionMiniE5: number;
    setuserOptionMiniE5: Dispatch<SetStateAction<number>>;
    userOptionMiniE6: number;
    setuserOptionMiniE6: Dispatch<SetStateAction<number>>;
    currentEx: number
}