import React from 'react';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return <span className={"material-symbols-outlined"}>{name}</span>;
};

export default Icon;
