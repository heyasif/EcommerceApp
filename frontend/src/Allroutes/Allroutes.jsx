import { Routes, Route } from "react-router-dom";
import SingleProduct from "../Component/SingleProduct";
import Home from "../Component/Home";
import AddProduct from "../Component/AddProduct";

function Allroutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default Allroutes;
