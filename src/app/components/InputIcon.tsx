import React from 'react';
import Icon from './Icon';

interface InputIconProps {
  name: string;
}

const InputIcon: React.FC<InputIconProps> = ({ name }) => {
  return (
    <div className={"select-none absolute right-0 top-[50%] translate-x-[-20px] translate-y-[-50%]"}>
      <Icon name={name} />
    </div>
  );
};

export default InputIcon;
