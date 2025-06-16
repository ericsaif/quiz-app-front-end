export interface displayed_parts{
    displayedText: string,
    blankValues: string[], 
    handleInputChange: (letter: string, wordIndex: number, letterIndex: number) => void
}