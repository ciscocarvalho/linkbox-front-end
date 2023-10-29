import React from 'react';
import DashboardFolder from '../DashboardFolder';
import Icon from '../../components/Icon';

interface FolderDataContainer {
  folder: DashboardFolder;
}

const FolderDataContainer: React.FC<FolderDataContainer> = ({ folder }) => {
  return <div className="folder-data-container">
    <div className="card-icon-container">
      <Icon name="folder" />
    </div>
    <p className="folder-name">{folder.name}</p>
  </div>;
};

export default FolderDataContainer;
