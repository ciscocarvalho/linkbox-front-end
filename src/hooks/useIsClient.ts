import { useContext } from "react";
import { IsClientContext } from "../contexts/IsClientContext";

export function useIsClient() {
  return useContext(IsClientContext);
}
