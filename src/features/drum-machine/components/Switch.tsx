import './Switch.scss';

type SwitchProps = {
  label: string,
  on: boolean,
  onClick: () => void,
  disabled: boolean,
};

const Switch = (props: SwitchProps) => {
  const disabled = props.disabled ? 'disabled' : '';
  const onClick = () => {
    if (props.disabled) return;
    props.onClick();
  };
  return (
    <div className={'switch-wrapper ' + disabled}>
      {props.label}
      <div className='Switch' onClick={onClick}>
        <div className={`inner ${props.on ? 'on' : ''}`}/>
      </div>
    </div>
  );
};

export default Switch;
