import { JSX } from "@emotion/react/jsx-runtime";
// import React, { SetStateAction } from "react";

export interface PopupInterface{
    triggerPopup: (isSuccess: boolean, message?: string, seconds?: number) => void
    isPopuptriggered: boolean
    popup: JSX.Element | null;
}