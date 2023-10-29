import React from 'react';
import Button from './Button';

type GoogleButtonProps = React.ComponentProps<typeof Button>;

const GoogleButton: React.FC<GoogleButtonProps> = ({ children, ...buttonProps }) => {
  let className = "flex justify-around items-center font-medium text-[17px]";

  if (buttonProps.className) {
    className = [className, buttonProps.className].join(" ");
  }

  return (
    <Button {...buttonProps} className={className}>
      {children}
    </Button>
  );
};

export default GoogleButton;
