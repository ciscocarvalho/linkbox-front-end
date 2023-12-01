import React from 'react';
import Icon from '../../components/Icon';
import { DashboardFolder } from '../types';

interface FolderDataContainer {
  folder: DashboardFolder;
}

const FolderDataContainer: React.FC<FolderDataContainer> = ({ folder }) => {
  return <div className="flex items-center gap-[20px] min-w-0">
    <div className="flex justify-center items-center min-w-[32px] w-[32px] h-[32px]">
      <Icon name="folder" />
    </div>
    <p className="text-[18px] overflow-hidden whitespace-nowrap text-ellipsis">{folder.name}</p>
  </div>;
};

export default FolderDataContainer;
