import React from 'react';

type PrimaryButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...buttonProps }) => {
  let className = "h-[60px] w-[279px] rounded-[20px] bg-[#90CDF4] text-[17px] duration-[.2s] hover:bg-[#80BEEE] hover:cursor-pointer hover:duration-[.2s] max-[315px]:w-[180px]";

  if (buttonProps.className) {
    className = [className, buttonProps.className].join(" ");
  }

  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  );
};

export default PrimaryButton;
