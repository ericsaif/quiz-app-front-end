export async function startRecording(props:{
    audioChunksRef: React.RefObject<Blob[]>,
    setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>,
    streamRef: React.RefObject<MediaStream | null>,
    setRecordingStatus: React.Dispatch<React.SetStateAction<string>>,
    setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
    mediaRecorderRef: React.RefObject<MediaRecorder | null>
}){
    const {audioChunksRef,
            setAudioBlob,
            streamRef,
            setRecordingStatus,
            setIsRecording,
            mediaRecorderRef
    } = props

    audioChunksRef.current = [];
    setAudioBlob(null);

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        setRecordingStatus('recording');
        setIsRecording(true);

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            setAudioBlob(audioBlob);
            setRecordingStatus('recorded');

            // Stop all tracks to release the microphone
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };

        mediaRecorder.start();
    } catch (err) {
        console.error("Error accessing the microphone:", err);
        setRecordingStatus('idle');
        console.log(err)
    }
};