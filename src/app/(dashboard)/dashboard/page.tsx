import React from 'react';
import { Metadata } from 'next';
import Dashboard from './components/Dashboard';
import '../../../styles/reset.css';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/logo/logo.svg' } ],
  manifest: 'manifest.json'
}

const Page: React.FC = () => {
  return <Dashboard />;
};

export default Page;
