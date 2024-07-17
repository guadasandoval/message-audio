import TRANSCRIPT from '../src/data/messages.json';
import AUDIO from '../src/data/call.wav';
import { useRef, useState } from 'react';

export interface Message {
  content: string;
  role: "agent" | "user";
  start: number;
  end: number;
}

function App() {
  const [progress, setProgress] = useState(0); // para ver el progreso del audio y manejar el scroll y la opacidad de los messages
  const audio = useRef<HTMLAudioElement>(null); // para ver el timeCurrent
  
  function handleClick(time:number){
    audio.current!.currentTime = time;
    audio.current?.play();
  }
   
  return (
    <section className='grid gap-4'> 
    <div className='grid gap-4'>
      {TRANSCRIPT.map((message:Message) => (
        <button key={message.start}
        onClick={() => handleClick(message.start)}
        className={`max-w-[90] p-4 text-left text-white rounded-xl ${message.role === 'user' ? 'justify-self-end bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-neutral-300 text-black'} ${progress < message.start ? 'opacity-50' : 'opacity-100'}` }
        > {message.content}</button>
      ))}
    </div>
    <audio ref={audio} src={AUDIO} controls 
    className='w-full sticky bottom-4'
    onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
    ></audio>
    </section>
   
  )
}

export default App
