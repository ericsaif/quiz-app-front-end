import { CreateQuestion } from "./CreateQuestion";

export interface CreateLAS extends CreateQuestion {
    s3PathToAudioFile: string | null;
    transcribedAudio: string | null;
}