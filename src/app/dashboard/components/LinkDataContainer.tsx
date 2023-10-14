import React from 'react';
import DashboardLink from '../DashboardLink';

interface LinkDataContainerProps {
  link: DashboardLink;
}

const LinkDataContainer: React.FC<LinkDataContainerProps> = ({ link }) => {
  return <div className="link-data-container">
    <div className="card-icon-container">
      <img src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`} />
    </div>

    <div className="info-container">
      <p className="link-title">{link.title}</p>
      <p className="link-url">{link.url}</p>
    </div>
  </div>;
};

export default LinkDataContainer;
