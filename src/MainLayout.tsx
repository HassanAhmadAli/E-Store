import { Outlet } from "react-router";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
