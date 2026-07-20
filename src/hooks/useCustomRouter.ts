import { useCallback, useEffect, useState } from "react";

type Route =
  | { name: "home" }
  | { name: "task-details"; taskId: string };

const getRoute = (pathname: string): Route => {
  const taskId = pathname.match(/^\/tasks\/([^/]+)$/)?.[1];

  return taskId ? { name: "task-details", taskId } : { name: "home" };
};

export function useCustomRouter() {
  const [route, setRoute] = useState<Route>(() =>
    getRoute(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute(window.location.pathname));

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, "", path);
    setRoute(getRoute(path));
  }, []);

  return { route, navigate };
}
