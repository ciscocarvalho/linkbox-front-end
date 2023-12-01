import React from 'react';
import { DashboardLink } from '../types';

interface LinkDataContainerProps {
  link: DashboardLink;
}

const LinkDataContainer: React.FC<LinkDataContainerProps> = ({ link }) => {
  return <div className="flex items-center gap-[20px] min-w-0">
    <div className="flex justify-center items-center min-w-[32px] w-[32px] h-[32px]">
      <img src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`} />
    </div>

    <div className="min-w-0">
      <p className="text-[18px] overflow-hidden whitespace-nowrap text-ellipsis">{link.title}</p>
      <p className="text-[12px] overflow-hidden whitespace-nowrap text-ellipsis">{link.url}</p>
    </div>
  </div>;
};

export default LinkDataContainer;
