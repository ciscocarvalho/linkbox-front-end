import React, { MouseEventHandler } from "react";
import Icon from "./Icon";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  icon: string;
  children?: React.ReactNode;
  [k: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      {...props}
      className={`w-[48px] h-[48px] flex justify-center items-center rounded-[50%] duration-[0.2s] select-none hover:cursor-pointer hover:bg-[#c2c8d1] hover:duration-[0.2s]${props.className ? " " + props.className : ""}`}
    >
      <Icon name={icon} />
      {children}
    </div>
  );
};

export default Button;
