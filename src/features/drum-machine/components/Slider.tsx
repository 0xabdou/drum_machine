import './Slider.scss';
import {ChangeEvent, useContext} from "react";
import MachineContext from "../machine-context";

type SliderProps = {
  min: number;
  max: number;
  value: number,
  onChange: (value: number) => void,
}

const Slider = (props: SliderProps) => {
  const power = useContext(MachineContext).power;
  const onVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(Number(e.target.value));
  };

  return (
    <input
      id='volume'
      type='range'
      min={props.min} max={props.max}
      onChange={onVolumeChange}
      disabled={!power}/>
  );
};

export default Slider;