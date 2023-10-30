import React from 'react';

interface DragIndicatorProps {
  amount: number
}

const DragIndicator: React.FC<DragIndicatorProps> = ({ amount }) => {
  if (amount <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center rounded-[100%] w-[20px] h-[20px] bg-[#BBC8DC] p-[20px]">
      <p>{amount}</p>
    </div>
  );
};

export default DragIndicator;
