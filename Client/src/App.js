
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./pages/Protectedroutes";
import React from 'react';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin/adminlogin';
import Adminpanel from './pages/Admin/adminpanel';
import UserProfile from "./pages/UserProfile";
import Homefull from "./pages/Homefull";

const App = () => {
  
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homefull />} />
          {/* <Route path="/Dashboard" element={<Home />} /> */}
          <Route path="/cart" element={
                        <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
          } />
          <Route path="/product" element={
                        <ProtectedRoute>
                        <Product />
                      </ProtectedRoute>
          } />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminpanel" element={<Adminpanel />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          
          }/>
         <Route path="/Profile" element={
            <ProtectedRoute>
              <UserProfile/>
            </ProtectedRoute>
          
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
