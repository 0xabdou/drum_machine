import './DrumMachine.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFreeCodeCamp} from "@fortawesome/free-brands-svg-icons";
import {useState} from "react";
import Pad, {PadConfig} from "./components/Pad";
import Switch from "./components/Switch";
import Slider from "./components/Slider";
import MachineContext from "./machine-context";

const HEATER_CONFIG: { [key: string]: PadConfig } = {
  'Q': {letter: 'Q', display: 'Heater 1'},
  'W': {letter: 'W', display: 'Heater 2'},
  'E': {letter: 'E', display: 'Heater 3'},
  'A': {letter: 'A', display: 'Heater 4'},
  'S': {letter: 'S', display: 'Clap'},
  'D': {letter: 'D', display: 'Open HH'},
  'Z': {letter: 'Z', display: "Kick n' Hat"},
  'X': {letter: 'X', display: 'Kick'},
  'C': {letter: 'C', display: 'Closed HH'},
};

const PIANO_CONFIG: { [key: string]: PadConfig } = {
  'Q': {letter: 'Q', display: 'Chord 1'},
  'W': {letter: 'W', display: 'Chord 2'},
  'E': {letter: 'E', display: 'Chord 3'},
  'A': {letter: 'A', display: 'Shaker'},
  'S': {letter: 'S', display: 'Open HH'},
  'D': {letter: 'D', display: 'Closed HH'},
  'Z': {letter: 'Z', display: "Punchy Kick"},
  'X': {letter: 'X', display: 'Side Stick'},
  'C': {letter: 'C', display: 'Snare'},
};

const MIN_VOLUME = 0;
const MAX_VOLUME = 100;

const PIANO_DISPLAY = 'Smooth Piano Kit';
const HEATER_DISPLAY = 'Heater Kit';

const DrumMachine = () => {
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(false);
  const [volume, setVolume] = useState(50);
  const [display, setDisplay] = useState(HEATER_DISPLAY);
  const [opacity, setOpacity] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const currentConfig = bank ? PIANO_CONFIG : HEATER_CONFIG;

  const togglePower = () => {
    setPower(!power);
  };

  const toggleBank = () => {
    setBank(!bank);
    if (!bank) setDisplay(PIANO_DISPLAY);
    else setDisplay(HEATER_DISPLAY);
    scheduleFade();
  };

  const onVolumeChange = (value: number) => {
    setVolume(value);
    setDisplay(`Volume: ${value}`);
    scheduleFade();
  };

  const scheduleFade = () => {
    if (timer) clearInterval(timer);
    setOpacity(1);
    const newTimer = setTimeout(() => {
      setOpacity(0);
    }, 1000);
    setTimer(newTimer);
  };

  const keys = Object.keys(currentConfig);
  const pads = keys.map(k => {
    const padConfig = currentConfig[k];
    return <Pad key={k} {...padConfig} />;
  });

  const displayClassName = opacity === 0 ? 'transparent' : 'opaque';
  return (
    <MachineContext.Provider value={{
      volume: volume,
      power: power,
      bank: bank,
      setDisplay: setDisplay,
      scheduleFade: scheduleFade,
    }}>
      <div id="drum-machine">
        <div id='logo'>
          FCC
          <FontAwesomeIcon id='logo-icon' icon={faFreeCodeCamp}/>
        </div>
        <div id='pads'>
          {pads}
        </div>
        <div id='controls'>
          <Switch label='POWER' on={power} onClick={togglePower} disabled={false}/>
          <div id='display'>
            <span className={'display ' + displayClassName}>{display}</span>
          </div>
          <Slider min={MIN_VOLUME} max={MAX_VOLUME} value={volume} onChange={onVolumeChange}/>
          <Switch label='BANK' on={bank} onClick={toggleBank} disabled={!power}/>
        </div>
      </div>
    </MachineContext.Provider>
  );
};


export default DrumMachine;