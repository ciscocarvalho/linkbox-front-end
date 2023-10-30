import React from 'react';
import PrimaryButton from './PrimaryButton';

type GoogleButtonProps = React.ComponentProps<typeof PrimaryButton>;

const GoogleButton: React.FC<GoogleButtonProps> = ({ children, ...buttonProps }) => {
  let className = "flex justify-around items-center font-medium text-[17px]";

  if (buttonProps.className) {
    className = [className, buttonProps.className].join(" ");
  }

  return (
    <PrimaryButton {...buttonProps} className={className}>
      {children}
    </PrimaryButton>
  );
};

export default GoogleButton;
