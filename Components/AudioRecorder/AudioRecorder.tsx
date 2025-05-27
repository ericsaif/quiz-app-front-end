"use client"

import './audioRecorder.css' 

import { MethodArgs } from '../../Models/QuizHubModels/MethodArgs';
import { AudioControls } from './Controls/AudioControls';


export default function AudioRecorder(props: {
  QPOId:number, 
  SM:string, 
  Topic?: string, 
  QId: number, 
  TimeOut: boolean
  submitAnswer: (SM: string, args: MethodArgs) => Promise<void>
}) {
  
  return AudioControls(props)
    
}