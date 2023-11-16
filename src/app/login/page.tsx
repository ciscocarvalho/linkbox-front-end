import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import Login from './Login';

export const metadata: Metadata = {
  title: 'Login',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const Page: React.FC = () => {
  return <Login />
};

export default Page;
