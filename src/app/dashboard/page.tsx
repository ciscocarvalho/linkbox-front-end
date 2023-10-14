import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import './dashboard.css';
import Dashboard from './Dashboard';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <Dashboard />
};

export default page;
