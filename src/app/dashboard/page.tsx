"use client"
import React from 'react';
import '../reset.css';
import Dashboard from './Dashboard';
import { useCookies } from 'react-cookie';

const Page: React.FC = () => {
  const [cookies] = useCookies(["token"]);

  if (!cookies.token) {
    window.location.href = "login";
    return null;
  }

  return <div className="h-[100vh] flex flex-col">
    <Dashboard />
  </div>;
};

export default Page;
