import {ReadResult} from './ReadResult'

export interface URTableData {
    readResults: ReadResult[] | null;
    totalCount: number;
}