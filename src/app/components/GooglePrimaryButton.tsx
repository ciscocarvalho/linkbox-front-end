import React from 'react';
import PrimaryButton from './PrimaryButton';

type GoogleButtonProps = React.ComponentProps<typeof PrimaryButton>;

const GoogleButton: React.FC<GoogleButtonProps> = ({ ...buttonProps }) => {
  let className = "flex justify-center items-center font-medium text-[17px] gap-[20px]";

  if (buttonProps.className) {
    className = [className, buttonProps.className].join(" ");
  }

  return (
    <PrimaryButton type="button" {...buttonProps} className={className}>
      <img src="/images/Google logo.svg" />
      <p>Continuar com o Google</p>
    </PrimaryButton>
  );
};

export default GoogleButton;
