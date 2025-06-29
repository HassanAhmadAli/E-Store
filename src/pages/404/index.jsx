import { useLocation } from "react-router";
export const NotFoundPage = function () {
  const pathname = useLocation().pathname;
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center text-red-500">
        <p className="text-xl font-bold">Error</p>
        <h1>404 - Page Not Found</h1>
        <h1>{`no such route "${pathname}"`}</h1>
      </div>
    </div>
  );
};
