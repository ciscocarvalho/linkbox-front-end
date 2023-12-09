import React from 'react';
import { Metadata } from 'next';
import Dashboard from './Dashboard';
import '../reset.css';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
  manifest: 'manifest.json'
}

const Page: React.FC = () => {
  return <Dashboard />;
};

export default Page;
