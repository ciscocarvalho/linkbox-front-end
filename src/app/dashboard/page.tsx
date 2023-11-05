"use client"
import React from 'react';
import '../reset.css';
import Dashboard from './Dashboard';
import { useCookies } from 'react-cookie';
import { useIsClient } from '../../hooks/useIsClient';

const Page: React.FC = () => {
  const [cookies] = useCookies(["token"]);
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  if (!cookies.token) {
    window.location.href = "login";
    return null;
  }

  return <div className="h-[100vh] flex flex-col">
    <Dashboard />
  </div>;
};

export default Page;
