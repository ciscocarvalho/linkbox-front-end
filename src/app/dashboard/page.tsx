import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import Dashboard from './Dashboard';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <div className="h-[100vh] flex flex-col">
    <Dashboard />
  </div>
};

export default page;
