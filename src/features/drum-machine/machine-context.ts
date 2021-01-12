import {createContext} from "react";

type MachineContextType = {
  power: boolean;
  bank: boolean;
  volume: number;
  setDisplay: (s:string) => void;
  scheduleFade: () => void;
}
const MachineContext = createContext<MachineContextType>({} as MachineContextType);

export default MachineContext;