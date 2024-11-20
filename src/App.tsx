import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { privateRoutes, publicRoutes } from "./routes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import Loading from "./components/Loading/Loading";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <>
              <Loading />
            </>
          }
        >
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  }
                />
              );
            })}
            <Route path="/" element={<PrivateRoutes />}>
              {privateRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <DefaultLayout>
                        <Page />
                      </DefaultLayout>
                    }
                  />
                );
              })}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
