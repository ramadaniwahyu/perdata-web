import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Dashboard/User/Users";
import CreateUser from "./pages/Dashboard/User/CreateUser";
import ViewDetailsUser from "./pages/Dashboard/User/ViewDetailsUser";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider, { UserContext } from "./contexts/UserContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/user" element={<Users />} />
              <Route path="/dashboard/user/create" element={<CreateUser />} />
              <Route path="/dashboard/user/:id" element={<ViewDetailsUser />} />
            </Route>
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/dashboard" />;
};
