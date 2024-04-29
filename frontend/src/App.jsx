import React, { Suspense, useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));
const NotFound = React.lazy(() => import("./pages/NoFound"));
import Layout from "./components/Layout";
import UserContext from "./context/user";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import About from "./pages/About";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loggedUserId, setLoggedUserId] = useState("");

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          userUsername,
          setUserUsername,
          userRole,
          setUserRole,
          loggedUserId,
          setLoggedUserId,
        }}
      >
        <Suspense fallback={<h1>loading...</h1>}>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate replace to="/main" />} />
              <Route path="main" element={<Main />} />
              <Route path="account" element={<Account />} />
              <Route path="admin" element={<Admin />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Suspense>
      </UserContext.Provider>
    </>
  );
}

export default App;
