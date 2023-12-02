"use client"
import React from 'react';
import '../reset.css';
import Dashboard from './Dashboard';
import { useIsClient } from '../../hooks/useIsClient';
import { useToken } from '../../hooks/useToken';

const Page: React.FC = () => {
  const { getToken } = useToken();
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  if (!getToken()) {
    window.location.href = "/login";
    return null;
  }

  return <div className="h-[100vh] flex flex-col">
    <Dashboard />
  </div>;
};

export default Page;
