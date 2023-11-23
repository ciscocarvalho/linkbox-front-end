import React from 'react';
import { DashboardLink } from '../types';

interface LinkDataContainerProps {
  link: DashboardLink;
}

const LinkDataContainer: React.FC<LinkDataContainerProps> = ({ link }) => {
  return <div className="flex items-center gap-[20px]">
    <div className="flex justify-center items-center min-w-[32px] w-[32px] h-[32px]">
      <img src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`} />
    </div>

    <div>
      <p className="text-[18px] line-clamp-1">{link.title}</p>
      <p className="text-[12px] line-clamp-1">{link.url}</p>
    </div>
  </div>;
};

export default LinkDataContainer;
