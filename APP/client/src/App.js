import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import Cart from './pages/Cart/Cart';
import Products from './pages/Products/Products';
import Profile from './pages/Profile/Profile';
import CreateProduct from './pages/CreateProduct/CreateProduct';

function App() {
  return (
    <>
      <div className="container">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
