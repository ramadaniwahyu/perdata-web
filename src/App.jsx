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

import Perkara from "./pages/Dashboard/Perkara/Perkara"
import CreatePerkara from "./pages/Dashboard/Perkara/CreatePerkara";
import ViewDetailsPerkara from "./pages/Dashboard/Perkara/ViewDetailsPerkara";

import Jurusita from "./pages/Dashboard/Jurusita/Jurusita"
import CreateJurusita from "./pages/Dashboard/Jurusita/CreateJurusita";
import ViewDetailsJurusita from "./pages/Dashboard/Jurusita/ViewDetailsJurusita";

import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider, { UserContext } from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";

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

              <Route path="/dashboard/pengguna" element={<Users />} />
              <Route path="/dashboard/pengguna/buat" element={<CreateUser />} />
              <Route path="/dashboard/pengguna/:id" element={<ViewDetailsUser />} />

              <Route path="/dashboard/perkara" element={<Perkara />} />
              <Route path="/dashboard/perkara/buat" element={<CreatePerkara />} />
              <Route path="/dashboard/perkara/lihat" element={<ViewDetailsPerkara />} />

              <Route path="/dashboard/jurusita" element={<Jurusita />} />
              <Route path="/dashboard/jurusita/buat" element={<CreateJurusita />} />
              <Route path="/dashboard/jurusita/lihat" element={<ViewDetailsJurusita />} />
            </Route>
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
      <Toaster 
      toastOptions={{
        className: "",
        style: {
          fontSize: "13px",
        },
      }}
      />
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
