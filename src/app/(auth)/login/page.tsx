import { Metadata } from 'next';
import React from 'react';
import '../../../styles/reset.css';
import Login from './components/Login';

export const metadata: Metadata = {
  title: 'Login',
  icons: [{ rel: 'short icon', url: 'images/logo/logo.svg' } ],
}

const Page: React.FC = () => {
  return <Login />
};

export default Page;
