import { Outlet } from "react-router";
import { NavBar } from "@/components/navbar";
export const MainLayout = function () {
  return (
    <div className="grid max-w-[100vw] gap-4 p-4">
      <div className="flex h-full w-full flex-col">
        <nav>
          <NavBar />
        </nav>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
