import { useEffect, useState } from "react";

const getWindowSizes = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const useWindowSizes = () => {
  const [windowSizes, setWindowSizes] = useState<{
    width: number,
    height: number
  }>();

  useEffect(() => {
    const resizeHandler = () => {
      setWindowSizes(getWindowSizes());
    };

    window.addEventListener("resize", resizeHandler);

    resizeHandler();
    
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return windowSizes;
};
