import './Pad.scss';
import {useContext, useEffect, useRef, useState} from "react";
import MachineContext from "../machine-context";

export type PadConfig = {
  letter: string;
  display: string;
}

const Pad = (config: PadConfig) => {
  const [active, setActive] = useState(false);
  const machineContext = useContext(MachineContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const soundUrl = 'mp3/' + (machineContext.bank ? 'p_' : 'h_') + config.letter.toLowerCase() + '.mp3';

  useEffect(() => {
    document.addEventListener('keyup', unfocus);
    document.addEventListener('keydown', focus);
    return () => {
      document.removeEventListener('keyup', unfocus);
      document.removeEventListener('keydown', focus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unfocus = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key.toLowerCase() === config.letter.toLowerCase()) {
      buttonRef.current?.click();
      setActive(false);
    }
  };

  const focus = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === config.letter.toLowerCase()) {
      fakePlay();
      setActive(true);
    }
  };

  const actuallyPlayAudio = () => {
    const audio = new Audio(soundUrl);
    audio.volume = machineContext.volume / 100;
    audio.play();
  };

  const fakePlay = () => {
    if (audioRef.current) audioRef.current.volume = 0;
    audioRef.current?.play();
  };

  const onClick = () => {
    actuallyPlayAudio();
    fakePlay();
    machineContext.setDisplay(config.letter);
    machineContext.scheduleFade();
  };


  return (
    <button
      ref={buttonRef}
      id={config.letter + 'i'}
      className={`drum-pad ${active ? 'active' : ''}`}
      onClick={onClick}
      disabled={!machineContext.power}>
      {config.letter}
      <audio ref={audioRef} id={config.letter} className='clip' src={soundUrl} preload='auto'/>
    </button>
  );
};

export default Pad;
