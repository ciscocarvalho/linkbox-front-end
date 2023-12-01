import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect";

const computeMobileView = () => {
  return isMobile || window.innerWidth <= 651;
}

export function useMobileView() {
  const [mobileView, setMobileView] = useState(computeMobileView());

  useEffect(() => {
    const listener = () => setMobileView(computeMobileView());
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    }
  }, []);

  return { mobileView };
}
