import { Metadata } from 'next';
import React from 'react';
import '../styles/reset.css';
import Home from './components/Home';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/logo/logo.svg' } ],
  manifest: 'manifest.json'
}

const Page: React.FC = () => {
  return <>
    <script src="/scripts/main.js" defer></script>
    <Home />
  </>
};

export default Page;
