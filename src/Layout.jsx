import { useState } from "react";
import Sidebar from "./components/Siderbar";

const Layout = ({ children }) => {
  const [miniToggle, setMiniToggle] = useState(true);
  const [miniSidebar, setMiniSidebar] = useState(false);
  return (
    <>
      {/* Sidebar component remains static above all elements on the page */}
      <main className="flex overflow-hidden h-screen w-screen max-width">
        <Sidebar
          miniToggle={miniToggle}
          setMiniSidebar={setMiniSidebar}
          setMiniToggle={setMiniToggle}
          miniSidebar={miniSidebar}
        />
        {/* <Sidebar /> */}
        {/* Main Dashboard display area */}
        <div
          className={`flex flex-col overflow-x-hidden  gap-4 md:gap-0 w-full h-full overflow-y-auto  `}
        >
          {/* When routing begins we would use the <Outlet/> functionality to render different pages */}
          {children}
          {/* <App /> */}
        </div>
      </main>
    </>
  );
};

export default Layout;
