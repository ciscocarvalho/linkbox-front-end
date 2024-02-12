import React from 'react';
import { cn } from '../lib/utils';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  return (
    <span className={cn(className, "material-symbols-outlined")} {...props}>
      {name}
    </span>
  );
};

export default Icon;
