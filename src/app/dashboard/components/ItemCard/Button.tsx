import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler<HTMLDivElement>,
  icon: string,
  children?: React.ReactNode,
  [k: string]: any,
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, children, ...props }) => {
  return (
    <div onClick={onClick} {...props} className={`btn card-btn${props.className ? " " + props.className : ""}`}>
      <span className="material-symbols-outlined">{icon}</span>
      {children}
    </div>
  );
}

export default Button;
