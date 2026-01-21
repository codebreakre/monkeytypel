import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='h-screen w-screen flex flex-col  items-center bg-[#323437] font-["JetBrains_Mono"] ' >
        <div className="w-3/5 h-screen flex flex-col justify-between items-center">
          <Nav />
          <div className="h-3/4 w-full flex justify-center items-center overflow-hidden">
          {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
