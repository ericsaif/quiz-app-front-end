import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [audioUrl, setAudioUrl] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);


  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      setAudioChunks([]);
      setIsRecording(true);

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        setAudioChunks((chunks) => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          return chunks;
        });
        setIsRecording(false);
      };
      

      mediaRecorderRef.current.start();
      console.log('Recording started...');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
      // Handle the error appropriately, e.g., display a message to the user.
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      console.log('Recording stopped.');
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>

      {audioUrl && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio src={audioUrl} controls />
          <button onClick={() => setAudioUrl('')}>Clear Recording</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;