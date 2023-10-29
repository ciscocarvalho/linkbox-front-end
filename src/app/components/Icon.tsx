import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const defaultClassName = "material-symbols-outlined";

  if (className) {
    className = [defaultClassName, className].join(" ");
  } else {
    className = defaultClassName;
  }

  return <span className={className}>{name}</span>;
};

export default Icon;
