import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="bg-background min-h-screen">
      <Outlet />
    </main>
  );
};

export default AppLayout;
