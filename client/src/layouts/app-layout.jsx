import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="bg-background overflow-y-hidden sm:p-[3%] h-screen">
      <Outlet />
    </main>
  );
};

export default AppLayout;
