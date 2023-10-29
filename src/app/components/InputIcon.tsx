import React from 'react';
import Icon from './Icon';

interface InputIconProps {
  name: string;
  className?: string;
}

const InputIcon: React.FC<InputIconProps> = ({ name, className }) => {
  const defaultClassName = "select-none absolute right-0 top-[50%] translate-x-[-20px] translate-y-[-50%]";

  if (className) {
    className = [defaultClassName, className].join(" ");
  } else {
    className = defaultClassName;
  }

  return <Icon name={name} className={className} />
};

export default InputIcon;
