"use client"
import { createContext, useEffect, useState } from "react";

export const IsClientContext = createContext(false);

interface IsClientCtxProviderProps {
  children: React.ReactNode;
}

// https://stackoverflow.com/a/75692565
export const IsClientCtxProvider: React.FC<IsClientCtxProviderProps> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <IsClientContext.Provider value={isClient}>
      {children}
    </IsClientContext.Provider>
  );
};
