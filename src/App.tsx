import {
  Navigate,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { FC, Suspense } from "react";
import { routes, RouteType } from "./routes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import Loading from "./components/Loading/Loading";
import { useAppSelector } from "./hooks/reduxHook";

const Layout: FC<RouteType> = ({
  isPrivateRoute,
  isAuthRoute,
  layout,
  component: Component,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const RouteLayout: any = layout || DefaultLayout;
  const { token } = useAppSelector((state) => state.user.user);
  if (!token && isPrivateRoute) {
    return <Navigate to={"/login"} />;
  }
  if (token && isAuthRoute) {
    return <Navigate to={"/"} />;
  }
  return (
    <RouteLayout>
      <Component />
    </RouteLayout>
  );
};
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Layout {...route} />}
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
