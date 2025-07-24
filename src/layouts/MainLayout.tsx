import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="h-screen">
      <header className="bg-[#0D0D0D] h-50 w-full text-blue-400 font-bold flex items-center justify-center text-4xl">
        To <span className="text-[#5E60CE]">Do</span>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
