import React from 'react';
import DashboardFolder from '../DashboardFolder';

interface FolderDataContainer {
  folder: DashboardFolder;
}

const FolderDataContainer: React.FC<FolderDataContainer> = ({ folder }) => {
  return <div className="folder-data-container">
    <div className="card-icon-container">
      <span className="material-symbols-outlined">folder</span>
    </div>
    <p className="folder-name">{folder.name}</p>
  </div>;
};

export default FolderDataContainer;
