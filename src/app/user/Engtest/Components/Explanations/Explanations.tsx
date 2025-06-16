const GetExplanations = (QPOId: number) =>{
    switch(QPOId){
        case 1: return GetCTest()
        case 2: return GetDictationQ()
        case 3: return GetRAQ()
        case 4: return GetDescribePicQ()
        case 5: return GetRACQ()
        case 6: return GetRSQ()
        case 7: return GetWordExistsQ()
        case 8: return GetDescribePicWAQ()
        case 9: return GetLASQ()
        case 11: return GetEssayQ()
        case 12: return GetIRQ()
        case 13: return GetILQ()
        case 14: return GetInterviewQ()
    }
}

function GetCTest(){
    return( 
    <div key={`This_is_a_CTest_question`}>
        <h3>Read and complete</h3>
        <p>
            For each question, you will see a text with an unfinished words.
            You will have 3 minutes to complete the sentence with the correct words.
        </p>
    </div>
    )
}

function GetDictationQ(){
    return( 
    <div key={`This_is_a_DictationQ_question`}>
        <h3>Listen and Type</h3>
        <p>
            For each question, you will listen to a sentence.
            Wou will have 1 minute to type in the sentence that you have heard.
            You can listen to the recording 3 times.
        </p>
    </div>
    )
}

function GetRAQ(){
    return( 
    <div key={`This_is_a_RAQ_question`}>
        <h3>Read Aloud</h3>
        <p>
            For each question you will be given a sentence to read aloud.
            When you are ready press on the record button.
            Be careful, because you will have only one chance to record yourself.
        </p>
    </div>
    )
}
function GetDescribePicQ(){
    return( 
        <div key={`This_is_a_DescribePicWAQ_question`}>
            <h3>Write About the Photo</h3>
            <p>
                For each question, you will see a picture, which you will need to describe.
            </p>
        </div>
    )
}
function GetRACQ(){
    return( 
    <div key={`This_is_a_RACQ_question`}>
        <h3>Fill in the Blanks</h3>
        <p> 
            This section will have 6-9 questions. For each question, you will see a sentence with an unfinished word.
            Wou will have 20 seconds to complete the sentence with the correct word.
        </p>
    </div>
    )
}
function GetRSQ(){
    return( 
    <div key={`This_is_a_RSQ_question`}>
        <h3>Speaking</h3>
        <p>
            For each question, you will be given a topic to speak about.
            You will record yourself speaking about the provided topics.
        </p>
    </div>
    )
}
function GetWordExistsQ(){
    return (
    <div key={`This is a WordExistsQ question`}>
        <h3>Read and Select</h3>
        <p>
            This Section will have 6 questions. For each question, you will see a word on the screen.
            You will have 20 seconds to choose if the word is a real word in English
        </p>
    </div>
    )
}
function GetDescribePicWAQ(){
    return( 
        <div key={`This_is_a_DescribePicQ_question`}>
            <h3>Speak about the Image</h3>
            <p>
                For each question you will see an image.
                You will need to record yourself speaking about that image.
            </p>
        </div>
    
    )
}
function GetLASQ(){
    return( 
    <div key={`This_is_a_LASQ_question`}>
        <h3>Listen and Speak</h3>
        <p>
            For each question in this section you will listen to a recording 
            and you will record yourself answering that question.

            You can listen to the recording 3 times and record yourself only once.
        </p>
    </div>
    )
}
function GetEssayQ(){
    return( 
    <div key={`This_is_a_EssayQ_question`}>
        <h3>
            Writing Sample
        </h3>
        <p>
            This section will have a writing question. 
        </p>
    </div>
    )
}
function GetIRQ(){
    return( 
    <div key={`This_is_a_IRQ_question`}>
        <h3>Interactive Reading</h3>
        <p>
            This section will have 1 reading passage. 
            You will have 7 or 8 minutes to answer 6 questions.
        </p>
    </div>
    )
}
function GetILQ(){
    return( 
    <div key={`This_is_a_ILQ_question`}>
        <h3>Interactive Listening</h3>
        <p>
            This section will have 1 conversation. 
            You will have 4 minutes to select 5-7 conversation turns and 75 seconds to write a summary.
        </p>
    </div>
    )
}
function GetInterviewQ(){
    return( 
    <div key={`This_is_a_InterviewQ_question`}>
        <h3>Speaking Sample</h3>
        <p>
            This section will have a speaking question.
        </p>
    </div>
    )
}
export default GetExplanations