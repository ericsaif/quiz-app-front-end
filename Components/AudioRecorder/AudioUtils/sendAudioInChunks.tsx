import { MethodArgs } from "../../../Models/QuizHubModels/MethodArgs";

export async function sendAudioInChunks(props: {
  QPOId:number, 
  SM:string, 
  Topic?: string, 
  QId?: number, 
  TimeOut: boolean
  submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, 
  audioBlob: Blob | null,
  CHUNK_SIZE: number
}) {
    const { SM, submitAnswer, QPOId, audioBlob, QId, CHUNK_SIZE, Topic = "" } = props


    const arrayBuffer = await audioBlob!.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const totalChunks = Math.ceil(uint8Array.length / CHUNK_SIZE);
    
    // First send metadata about the upcoming chunks
    console.info("- BeginAudioUpload - ")

    const beginUploadMargs: MethodArgs ={
      QPOId: QPOId,
      TotalChunks: totalChunks,
      TotalSize: uint8Array.length
    }

    await submitAnswer("BeginAudioUpload", beginUploadMargs);

    for (let i = 0; i < totalChunks; i++) {

        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, uint8Array.length);
        const chunk = uint8Array.slice(start, end);
        
        // Convert chunk to base64
        const base64Chunk = btoa(
            Array.from(chunk)
                .map(byte => String.fromCharCode(byte))
                .join('')
        );
      

      const UploadAudioChunkMargs: MethodArgs = {
          ChunkIndex: i,
          ChunkData: base64Chunk,
          QPOId: QPOId
      }

      await submitAnswer("UploadAudioChunk", UploadAudioChunkMargs);
    }

    const CompleteAudioUploadMargs: MethodArgs = { QPOId: QPOId, SM: SM, QId:QId, Topic: Topic }
    
    // Signal upload completion
    await submitAnswer("CompleteAudioUpload", CompleteAudioUploadMargs);
}