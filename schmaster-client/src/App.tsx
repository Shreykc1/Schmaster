import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>

        {/* private routes  */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes  */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} /> 
          <Route path="/profile" element={<Profile />} /> 
        </Route>
      </Routes>

    </main>
  );
};

export default App;
