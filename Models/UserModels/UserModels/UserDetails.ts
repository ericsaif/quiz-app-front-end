import { ReadEngTest } from "../../AdminModels/EngTestModels/readEngTest";


export interface UserDetails{
    id: string;
    email: string;
    username: string;
    EngTests : ReadEngTest[]
}