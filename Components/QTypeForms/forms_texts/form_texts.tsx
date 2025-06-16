export const CTest_text =(
        <>
            <span>
                <p>Запишите текст вопроса, вместо пропусков впишите текст как в примере.</p> 
                <p>Пример:</p> 
                <p style={{color: "red"}}>He was standing in front of the tab _ _</p>
                <p style={{color: "green"}}>He was standing in front of the tab[BLANK:2]</p>
                <p>Обьяснение - вместо двух пропусков _ _ ставите [BLANK:2]  </p>
                <p>2 - количество пропусков в слове</p>

                <p>
                    Когда вы это сделаете выпадет список полей, 
                </p>
                <p>
                    Впишите в них правильные буквы для каждого слова
                </p>

                Пример:<br/>
                <b>le</b>
            </span>
        </>
    )

export const describe_pic_text = (
        <span>
            <p>Вставьте локацию картинки с облачного хранилища</p>
            <p>Далее выберите - нужно ли описывать картинку с аудио или текстом</p>
        </span>
    )

export const dict_text = (
        <span>
            <p>Вставьте локацию аудио с облачного хранилища</p>
            <p>Далее запишите правильный ответ</p>
        </span>
)



export const essay_text =  (
    <span>
        Впишите тему эссе в поле - Тема
    </span>
)




export const interview_text = (
    <span>
        Впишите тему Интервью в поле - Тема Интервью
    </span>
)

export const LAS_text = (
    <span>
        <p>Вставьте локацию аудиофайла с облачного хранилища</p>
        <p>Далее впишите транскрипцию текста с аудио</p>
    </span>
)

export const RA_text = (
    <span>
        <p>Введите в поле ТЕКСТ - текст, который нужно произнести вслух:</p>
    </span>
)

export const RAC_text = (
    <span>

        <p>Впишите текст с пробелами в поле - ТЕКСТ</p> 
        <p>Введите вместо пробелов впишите - [BLANK:N]</p> 
        <p>Вместо N вставьте количество пропущенных букв в слове</p>

        <h6>Пример:</h6> 
        <p style={{color: "red"}}>He was standing in front of the tab _ _</p>
        <p style={{color: "green"}}>He was standing in front of the tab[BLANK:2]</p>
        <p>Обьяснение - вместо двух пробелов _ _ ставите [BLANK:2]</p>  
        <p>2 - количество пробелов в слове</p>

        Далее впишите правильные буквы в поле ОТВЕТ<br/>

        Пример:<br/>
        <b>le</b>
    </span>
)

export const RS_text = (
    <span>

        <p>Введите текст/тему, о которой нужно говорить вслух в поле - ТЕКСТ</p> 
        
    </span>
)

export const WE_text = (
    <span>

        <p>Введите слово в поле - СЛОВО</p> 
        <p>Далее выберите существует ли данное слово в выпадающем листе - СУЩЕСТВУЕТ ?</p> 
        
    </span>
)